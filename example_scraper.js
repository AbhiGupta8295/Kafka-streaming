// Scrapes Forbes website
const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio'); // for parsing HTML
const fs = require('fs');
const { exit } = require('process');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeWebsite(url, sessionId) {
    try {
        const response = await axios.get(url, {
            headers: {
                'Cookie': 'VWO=75.600',
                'Cache-Control': 'no-cache',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'session_id': 'sessionId'
            }
        });
        const html = response.data;
    console.log(typeof(html))
        let data = '';
        console.log(html);

        let filepath = 'D:\\kafka_2.12-3.7.0\\bin\\windows\\test.txt';
        for (let i = 0; i < html.personList.personsLists.length; i++) {
            // await sleep(5000);
            data = (html.personList.personsLists[i].uri);
            data += '\n';
            fs.appendFile(filepath, data, (err) => {
                if (err) throw err;
            })
        }

    } catch (error) {
        console.error('Error fetching and parsing data', error);
    }
}

// Call the function with the URL of the website you want to scrape
scrapeWebsite('https://www.forbes.com/forbesapi/person/rtb/0/-estWorthPrev/true.json?fields=rank,uri,personName,lastName,gender,source,industries,countryOfCitizenship,birthDate,finalWorth,estWorthPrev,imageExists,squareImage,listUri', 'aeb5a75d8be0006f65b88278163c8235524c7bd6');


