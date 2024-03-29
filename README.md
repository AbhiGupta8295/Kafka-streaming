# Kafka using node.js
This application uses Kafka to stream messages on the console from NSE India website 'https://www.nseindia.com/market-data/live-equity-market'.

<ul>
<li>
<h3> To run the application, first start the zookeeper and kafka server in separate terminals. After this execute the standalone.bat script as mentioned in the walkthorugh.</h3>    
</li>

<li>
<h3>Before running the nseindia-producer.js file, edit the Cookie value. This can be retrieved by sending a GET request to the 'https://www.nseindia.com/market-data/live-equity-market' using POSTMAN.</h3>
</li>

<li>
<h3> To get step by step walkthrough click <a href="https://github.com/AbhiGupta8295/Kafka-streaming/blob/master/kafka%20steps.txt">here</a></h3>
</li>

</ul>
-nseindia-producer.js: <strong>T</strong>his file scrapes the nse-india website for any changes at every 15 seconds interval and stores the data in a test.csv file inside the folder where kafka resides.

-consumer-template.js: <strong>T</strong>his file is a common template for the consuming the messages produced by the nseindia-producer.js file.

To configure producer-consumer relation, specify the same topic name for the both files.

-producer-template.js: <strong>T</strong>his file is a common template for the producer server which use 'chance' module to produce random names of animals and correspondingly gets consumed by the consumer-template.js file keeping the topic name same for both.

-example_scraper.js: <strong>T</strong>his file is a common template for the web scrapers. As of now, this scrapes data of the world's top richest personalities from 'forbes.com'.

Learn kafka: 
1. https://anhthi.netlify.app/docs/architecture/message_queue/kafka/
2. https://kafka.apache.org/documentation/#gettingStarted

Installation: (Download and extract the binary file .tgz): 
https://kafka.apache.org/downloads
