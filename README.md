### SPECTRUM
“Spectrum”, the launch vehicle built by Isar Aerospace just performed a successful lift-off from
the launch pad and is flying towards Earth orbit. A web service provides live insights into
Spectrum’s sensor system during its maiden flight.

## Installing 

Run ```npm install``` to installing dependency
Run ```npm run test``` for testing locally
Run ```npm run dev``` to start the development server

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## TECHNOLOGY
- REACT 
- NEXTJS
- REACT QUERY
- JEST
- RECHARTS

## Possible Improvements in API

- Retrieved data from the web socket is in pascal case and from the api it is in camel case. It could have been possible to return them in the same format.
- The **sensor status** api returns an object without REST convention. Possible modification on a success response 
```
{
  "status": "success",
  "statusCode": 200,
  "data": {
    "velocity": -1.3565148573846164,
    "altitude": -32377.848900789773,
    "temperature": 6.762631030455157,
    "statusMessage": "Rocket systems are operational and monitoring.",
    "isAscending": false,
    "isActionRequired": false
  }
}

```
- Units are missing for Velocity, altitude and temperature.
- Timestamp field were missing from the API.
- **isActionRequired** could be renamed to **hasActionRequired**.
- From **ActOnSpectrum** api, it could have been better to add proper HTTP response for success and errors.

