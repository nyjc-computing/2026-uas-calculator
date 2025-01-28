const gradeToRP = {
    "A": 20,
    "B": 17.5,
    "C": 15,
    "D": 12.5,
    "E": 10,
    "S": 5,
    "U": 0
}
const h1Multiplier = 0.5

document.addEventListener("DOMContentLoaded", () => {
    
    const submitButton = document.getElementById("submit")
 
    submitButton.addEventListener("click", () => {

        let totalRP = 0

        
        const subjectNames = document.getElementsByClassName("subject-name-input")
        const subjectScores = document.getElementsByClassName("subject-score-input")
        const subjectLevels = document.getElementsByClassName("subject-level-input")
    
        const h1Subjects = [] // For rebasing; Hence excludes General Paper
        const h2Subjects = []

        // Iterate through the subject name and score fields and collect data
        for (let i = 0; i < subjectNames.length; i++) {
            const subjectName = subjectNames[i].value
            const subjectScore = subjectScores[i].value
            
            if (subjectLevels[i].value == "H1") {
                if (subjectName == "General Paper")
                    totalRP += gradeToRP[subjectScore]*h1Multiplier // Adds General Paper directly to total RP
                                                                    // as GP is compulsory
                else if (subjectScore != "EX")
                    h1Subjects.push({ name: subjectName, RP: gradeToRP[subjectScore]*h1Multiplier})
            }
            else
                h2Subjects.push({ name: subjectName, RP: gradeToRP[subjectScore]})
        }
    
        // Log the subjects array to the console
        console.log("H1:", h1Subjects)
        console.log("H2:", h2Subjects)
        console.log("Total RP:", totalRP) 
    })
})
