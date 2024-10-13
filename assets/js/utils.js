//Function to get the priority string from a number
function getPriorityFromNumber(priority) {
    switch (priority) {
        case 1: 
            return 'critical';
        case 2: 
            return 'high';
        case 3:
            return 'medium';
        case 4:
            return 'low';
        default:
            return 'minor';
    }
}