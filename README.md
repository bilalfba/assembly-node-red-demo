Node-RED Bluemix Demo for the Assembly Workshop on STT/TSS, Personality Insights, and Tone Analyzer 
====================================

## Node-RED in IBM Bluemix

This repository is an example Node-RED application that can be deployed into
Bluemix with only a couple clicks. Seet up the demo by clicking on:

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/ibmets/node-red-bluemix-starter.git)

## How does this work?

When you click the button, you are taken to Bluemix where you get a pick a name
for your application at which point the platform takes over, grabs the code from
this repository and gets it deployed.

It will automatically create an instance of the Cloudant service, call it
`sample-node-red-cloudantNoSQLDB` and bind it to you app. This is where your
Node-RED instance will store its data. If you deploy multiple instances of
Node-RED from this repository, they will share the one Cloudant instance.

When you first access the application, you'll be asked to set some security options
to ensure your flow editor remains secure from unauthorised access.

It includes a set of default flows that are automatically deployed the first time
Node-RED runs.

## Customising Node-RED
### Configuring the services
Add and bind the following services to the application:

  * Speech to Text
  * Text to Speech
  * Personality Insights
  * Tone Analyzer

Then head over to project overview tab and ennable continuous delivery. We will use this 
to modify the node red setting. 

### Step two, setting up the flow:

Start by adding a an HTTP request, a template, and an HTTP response; this will be 
the main interface for the user when he opens the root address. The, add the contents of 
indext.html to the template node.

Deploy this and the app url and head to the route (example: https://assembly-node-red.mybluemix.net/)
to see the results. To actually add the functionality, add a function node and connect it to the output
of the HTML request; this node will run when the request is sent. In this function node, add the JavaScript 
content of inject_audio.js; this piece of code will retrieve the url of a one miit monologue and pass it on.
After this functionon, insert the Speach to Text node and then the Tone Analyzer and Personality Insight nodes.
Connect the Tone and Personality nodes to the output of the Speech to Text.

Next add another function and insert the code from personality_summary.js; this code will call in a custom class
that will summarize the personality obtained from the two previous nodes. Finally connect this to the Text to Speech
node.

Before deploying, open both the STT and the TTS nodes and ensure the *Place output on msg.payload* is ennabled. Also,
make sure both are set to the language you need (they should be both the same language). Now Deploy the app and open 
the browser page, the page would load; now if you head back to the flow, you should see a blue point benethe the nodes
indicating what is being executed at the moment. You will also see a red point indicating an error in the summary
function; we will get to that later.

To actually read out the audio from the TTS, you need to add the play audio node. To do so, go to settings, 
manage palett, install and enter `node-red-contrib-audio`. Install it and wait for it to finish; when done, you should
be able to find a play audio node. Add it to the end of the flow and connect it to tht TTS node. Deplpoy and run

### Step 3, Configuring the custom summary

In order to be able to use the custom summary function we have to manually insall it. Head to the continuous 
delivery toolchain in Bluemix and then viw the toolchain. Then open the git toolchain and clone the files. Once done, 
find a file called bluemix-settings.js and open it. Modify `functionGlobalContext` to the following:
```javascript
functionGlobalContext: {
    PersonalitySummary:require('personality-text-summary')
}
```
When done, head to packages.json and add `"personality-text-summary":"2.1.x"` to the dependencies. When done, use 
the bluemix console to push the app back to the cloud. When the push is complete, refresh the app page and follow
the flow. When the flow finishes you should hear the personality summary of the speaker.

