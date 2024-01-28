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
      export function reducePovertyNumber(totalPovertyCount, povertyCount, wealthToShare, value) {
        var wealthToShareInPounds = wealthToShare * 1000000000 * (value/100.0);

        // Adjust wealth to share for each demographic
        if (totalPovertyCount == povertyCount) {
            // Do nothing as this is the total
        }
        else {
            wealthToShareInPounds = (povertyCount / totalPovertyCount) * wealthToShareInPounds;
        }

        var numberOfPeopleOutOfPoverty = Math.floor(wealthToShareInPounds / povertyLine);
        povertyCount -= numberOfPeopleOutOfPoverty;
        
        // Handle -ve numbers
        return povertyCount < 0 ? 0 : povertyCount;
    };

    // Helper function to work out % change
    export function calculatePercentageChange(originalValue, newValue) {
        var percentChange = (newValue / originalValue) * 100;
        return roundToDecimalPlaces(percentChange, 1);
    }

    // Help function to round to x decimal places
    function roundToDecimalPlaces(num, decimalPlaces) {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(num * factor) / factor;
      }
      