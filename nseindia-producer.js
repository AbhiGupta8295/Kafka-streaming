// Scrapes nse-india website for live stocks prices
const { Kafka } = require('kafkajs')
const request = require('request');
const fs = require('fs')

// Apache Kafka producer
const kafka = new Kafka({
    clientId : 'my-app',
    brokers: ['localhost:9091', 'localhost:9092', 'localhost:9093']
})
const producer = kafka.producer();
const topic = 'connect-test';


var options = {
    'method': 'GET',
    'url': 'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050',
    'headers': {
        'Cookie': '_abck=50946D35B04E0D5FB8994F2E8A9470F4~-1~YAAQf8MzuNsi8DaOAQAAdQgtVQvHkU/Sd9jj0DBARlUT+O1/BgwETGAq41h7RnGi2ENLfU1BaANY7oGg43BqdaOzQ4qw8xHeCVA9tPGcxzMjX0eE1xc8EMyDPOx7GktOV3CzCTL4u1Qbnrf9xRJ/3jP+Hm+919daE3WD0GR/DpCEwnP5yVeNksY8fQVDsqFf89EXUpZp2SR/uXXv3teN4ChLxhoObcMroR6ynJajs8HoRht5d5EQhHTC5EJuE6KmE/QqORCY8p/02xEP66J/n7ky7DUUN6k+6KzTndDlHeINmbaRp/qBeL00Ixkl3eb8JqpoHYwTD1n7YHYjVSIqkRu6ntaAdrsmx+MMQ7vB1T1f/QRnIJzTCMXWl8To+r8S4G8GbQVEiYRU~-1~-1~-1; ak_bmsc=6EBEAD8433CF0CADAAE3F4999C303D3C~000000000000000000000000000000~YAAQf8MzuNwi8DaOAQAAdQgtVReli5OVkNm0i8kNGeqevGGsn2n8Nzz1Vc9A8mcu9PxEo4PSy/lkVd/gdzeSJtuLrPxdvD7VEaVLxrOkNCtEa8x99fBgxwwCg77xhy96LunfTCMiIl8GV2fqNizCqGQWHMzzW5NZ8HDoWhnId5RT5lpirAKbaY3i7kvngrvVixb+mYRZ48wvMZ53vtYraYmVqkExH8WK4gmzRPxc1XWqJgR6ncU94m19iVaUPb3VMTNkzGqytQ9TVx/ajXYj8St+/YIi2iwFNj/czdcV9XKpGjgz+DhpTT1qC6Mo3RW045VdcfBFsXq/YDD00FZ8q8rLYG6n4js7yOWkEdx8wxAe0No6lLXtp8s+Y3ZAQCY=; bm_sz=4C1164D301AD7AE5515943B27BE46594~YAAQf8MzuN0i8DaOAQAAdQgtVRfsqnBuafkPpXyiNetCzYxurEEHuMGfpQBcr5TMdaJ0fWXn2jfvcEUeN6SwLdjyyZdJocawGXTxmPW2kHaYncIzhJsJP62o+v29BWop4Jipt+RhOfapknVLJRLFjkpsjfu2NaPFdKC4/OrbNvH+QQVEv12rrUniLiVnvAv95ahv8WtKLyvSq4aa9zES5wBcFJiDE0+0ToUN69XMXQmD6SUn67Hr/rk0NpZUG2edtxswDl08YV/vxqP/AUusDT4nQFLeYwReRK7oVNCw1OeKpR3mU0ZQMMGsBVa6SHAw8qgyEDVlDk2GflsDXsiHRyM8KNulSLKAwrkTKdu3vA==~4404801~3289909'
    }
};

//request made to the server
const scraper = () => {
    request(options, function (error, response) {
        if (error) throw new Error(error);
        const html = JSON.parse(response.body);
        let data = html.data;
        // path to kafka folder
        let filepath = 'D:\\kafka_2.12-3.7.0\\bin\\windows\\test.csv';
        // let testFilePath = './test.csv';

        const headers = ['SYMBOL', 'IDENTIFIER', 'OPEN', 'HIGH', 'LOW', 'PREV. CLOSE', 'LAST TRADED PRICE', 'CHANGE', '%CHANGE', 'VOLUME (shares)', 'VALUE (crores)', '52 H(yearHigh)', '52 L(yearLow)', '30 D %Change', 'TODAY'];
        const header = headers.join(',') + '\n';
        const values = html.data.map(item => (`${item.symbol}, ${item.identifier}, ${item.open}, ${item.dayHigh}, ${item.dayLow}, ${item.previousClose}, ${item.lastPrice}, ${item.change.toFixed(2)}, ${item.pChange}, ${item.totalTradedVolume}, ${(item.totalTradedValue / Math.pow(10, 7)).toFixed(2)}, ${item.yearHigh}, ${item.yearLow}, ${item.perChange30d}, ${item.chartTodayPath}`)).join('\n');
        const csvData = header + String(values);
        fs.appendFile(filepath, csvData, 'utf8', err => {
            if (err) {
                console.error('Error writing CSV file:', err);
            } else {
                console.log('CSV file saved successfully.');
            }
        });

    });
}

setInterval(scraper, 15000);
const run = async () => {
    // Producing
    await producer.connect()

}
run();
