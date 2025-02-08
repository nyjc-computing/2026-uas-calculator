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

        let totalRPBeforeRebase = 0

        const subjectNames = document.getElementsByClassName("subject-name-input")
        const subjectScores = document.getElementsByClassName("subject-score-input")
        const subjectLevels = document.getElementsByClassName("subject-level-input")
    
        const h1Subjects = [] // For rebasing; Hence excludes General Paper
        const h2Subjects = []

        // Iterate through the subject name and score fields and collect data
        for (let i = 0; i < subjectNames.length; i++) {
            const subjectName = subjectNames[i].value

            // Stop execution if any subject name is empty
            if (subjectName == "") {
                alert("Please fill in all subject names before calculating!");
                return;
            }
            
            const subjectScore = subjectScores[i].value
            
            if (subjectLevels[i].value == "H1") {

                // Adds General Paper directly to total RP  as GP is compulsory
                if (subjectName == "General Paper")
                    totalRPBeforeRebase += gradeToRP[subjectScore]*h1Multiplier 
                    
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
            totalRPBeforeRebase += h2Subjects[i]["RP"]

        // Downgrades worst H2 subject to H1 for rebasing if 4 H2s
        if (h2Subjects.length == 4) {
            downgradedH2 = h2Subjects[h2Subjects.length - 1]
            h2Subjects.pop()
            
            h1Subjects.push({ name: downgradedH2["name"], RP: downgradedH2["RP"]*h1Multiplier, originalLevel: "H2"})
        }

        let totalRP = totalRPBeforeRebase

        // Sort h1Subjects by RP in descending order
        h1Subjects.sort((a, b) => b.RP - a.RP)
        let rebasedSubjects = []
        let notRebasedSubjects = []

        // Rebases with 1 H1 / 2 H1s
        let H1RP = 0
        for (let i = 0; i < h1Subjects.length; i++) {
            H1RP += h1Subjects[i]["RP"]
            let rebasedRP = ((totalRPBeforeRebase + H1RP) / (70 + (i+1)*10)) * 70   

            if (rebasedRP > totalRP) {
                rebasedSubjects.push(h1Subjects[i])
                totalRP = rebasedRP
            } else {
                while (i < h1Subjects.length) {
                    notRebasedSubjects.push(h1Subjects[i])
                    i++
                }
            }
        }

        // Update "Your score"
        const scoreElement = document.getElementById("results")
        scoreElement.textContent = `${totalRP.toPrecision(4)}rp`
        
        // Update "Subjects used in H2 Calculation"
        const h2SubjectListElement = document.getElementById("subject-list")
        h2SubjectListElement.innerHTML = ""
        
        h2Subjects.forEach(subject => {
            const listItem = document.createElement("li")
            listItem.textContent = `H2 ${subject["name"]}` // Set the text content to the subject name
            h2SubjectListElement.appendChild(listItem) // Append the list item to the unordered list
        })

        // Update "Subjects that were rebased"
        const rebasedSubjectListElement = document.getElementById("subject-rebased-list")

        if (rebasedSubjects.length == 0)
            rebasedSubjectListElement.innerHTML = "None"
        else {
            rebasedSubjectListElement.innerHTML = ""
        
            rebasedSubjects.forEach(subject => {
            const listItem = document.createElement("li")
            listItem.textContent = `${subject["originalLevel"]} ${subject["name"]}` // Set the text content to the subject name
            rebasedSubjectListElement.appendChild(listItem) // Append the list item to the unordered list
        })}

        // Update "Subjects that were NOT rebased"

        const notRebasedSubjectListElement = document.getElementById("subject-not-rebased-list")

        if (notRebasedSubjects.length == 0)
            notRebasedSubjectListElement.innerHTML = "None"
        else {
            notRebasedSubjectListElement.innerHTML = ""
            
            notRebasedSubjects.forEach(subject => {    
            const listItem = document.createElement("li")
            listItem.textContent = `${subject["originalLevel"]} ${subject["name"]}` // Set the text content to the subject name
            notRebasedSubjectListElement.appendChild(listItem) // Append the list item to the unordered list
        })}
        const resultsArea = document.getElementById("results-area")
        resultsArea.style.display = "block";
        scroll({top:  resultsArea.getBoundingClientRect().top + window.scrollY, behavior: "smooth"})
        
        // // Logs
        // console.log("H1:", h1Subjects)
        // console.log("H2:", h2Subjects)
        // console.log("Rebased:", rebasedSubjects) 
        // console.log("Non rebased:", notRebasedSubjects) 
        // console.log("Total RP:", totalRP) 
    })
})