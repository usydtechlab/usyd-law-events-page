# USYD Law Events Page Revamp

The objective is to make an easy to use
and access events page for the faculty of
Law at the University of Sydney.

## How it works

A JSON array data file acts as a feeder
source that is fetched and loaded
asynchronously into the webpage.<br>
The JSON's structure is: <br>
<code>
{
"title": "title of the event",
"description": "description of the event",
"date": "date of the event",
"time": "time of the event",
"image64": An encoded data URI
base64 string to load the image in.
}
</code>

This data json object is loaded into main.js which extracts each entry and creates an event object for each event and displays them.
<br>

Made with 💙 at the TechLab.