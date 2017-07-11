var PersonalityTextSummaries = global.get('PersonalitySummary');

// locale is one of {'en', 'es', 'ja'}.  version refers to which version of Watson Personality Insights to use, v2 or v3.
var v3EnglishTextSummaries = new PersonalityTextSummaries({ locale: 'en', version: 'v3' });

// retrieve the summary for a specified personality profile (json)
var textSummary  = v3EnglishTextSummaries.getSummary(msg.insights);

msg.payload = textSummary;
return msg;