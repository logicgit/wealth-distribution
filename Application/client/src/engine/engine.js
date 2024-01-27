    // engine.js
    // Functions to do our calculations

    // Amount of money required to remove someone from poverty
    const povertyLine = 10000
    
    // Adjust the value by the %
    export function adjustValue(value, percent) {
        var adjustedValue =  value * ((100-percent)/100.0);
        return Math.floor(adjustedValue * 100) / 100
    };

     // Reduce the value by the %
    export function reduceValue(value, percent) {
        var adjustedValue =  value * ((100-percent)/100.0);
        return Math.floor(adjustedValue * 100) / 100
    };

    // We are going to adjust the number of people in poverty by assigning the wealthToShare
    // The wealthToShare divided by the povertyLine is the number of people who can be removed
    // Convert inbound figure from billions to pounds
    // We need to work out what % of the total pot each demopgraphic can have
      export function reducedPovertyNumber(totalPovertyCount, povertyCount, wealthToShare, value) {
        var wealthToShareInPounds = wealthToShare * 1000000000 * (value/100.0);

        // Adjust wealth to share for each demographic
        if (totalPovertyCount == povertyCount) {
            // Do nothing as this is the total
        }
        else {
            wealthToShareInPounds = (povertyCount / totalPovertyCount) * wealthToShareInPounds;
        }
        
        var numberOfPeopleOutOfPoverty = Math.floor(wealthToShareInPounds / povertyLine);
        // Handle -ve numbers
        return numberOfPeopleOutOfPoverty > povertyCount ? povertyCount : numberOfPeopleOutOfPoverty;
    };