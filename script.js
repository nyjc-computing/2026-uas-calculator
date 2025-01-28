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

                // Adds General Paper directly to total RP  as GP is compulsory
                if (subjectName == "General Paper")
                    totalRP += gradeToRP[subjectScore]*h1Multiplier 
                    
                else if (subjectScore != "EX")
                    h1Subjects.push({ name: subjectName, RP: gradeToRP[subjectScore]*h1Multiplier, originalLevel: "H1"})
            }
            else
                h2Subjects.push({ name: subjectName, RP: gradeToRP[subjectScore]})
        }
        
        // Sort h2Subjects by RP in descending order
        h2Subjects.sort((a, b) => b.RP - a.RP)

        // Add 3 best H2s if 4 H2s, or only 3 H2s
        for (let i = 0; i < 3; i++)
            totalRP += h2Subjects[i]["RP"]

        // Downgrades worst H2 subject to H1 for rebasing if 4 H2s
        if (h2Subjects.length == 4) {
            downgradedH2 = h2Subjects[h2Subjects.length - 1]
            h2Subjects.pop()
            
            h1Subjects.push({ name: downgradedH2["name"], RP: downgradedH2["RP"]*h1Multiplier, originalLevel: "H2"})
        }

        // Update "Your score"
        const scoreElement = document.getElementById("results")
        scoreElement.textContent = `${totalRP}rp`
        
        // Update "Subjects used in H2 Calculation"
        const subjectListElement = document.getElementById("subject-list")
        subjectListElement.innerHTML = ""
        
        // Add each subject to the list
        h2Subjects.forEach(subject => {
            const listItem = document.createElement("li")
            listItem.textContent = `H2 ${subject["name"]}` // Set the text content to the subject name
            subjectListElement.appendChild(listItem) // Append the list item to the unordered list
        })
        
        // Log the subjects array to the console
        console.log("H1:", h1Subjects)
        console.log("H2:", h2Subjects)
        console.log("Total RP:", totalRP) 
    })
})
