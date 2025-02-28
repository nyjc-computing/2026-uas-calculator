const gradeToRP = {
    "A": 20,
    "B": 17.5,
    "C": 15,
    "D": 12.5,
    "E": 10,
    "S": 5,
    "U": 0
}

function validateSubjects() {
    // Checks if mother tongue subject was selected
    let mtSubject = document.getElementById("mtselector").value
    
    if (mtSubject === "") {
        alert("Please select MT Subject!")
        return false
    }

    // Ensures all subjects are unique 
    let subjectNames = [...document.getElementsByClassName("subject-name-input")]
    let subjectNamesSet = new Set(subjectNames.map(e => e.options[e.selectedIndex].text.replace(/^H[12] /, ""))) // To ensure H2/H1 physics are seen as not unique
    const unique = subjectNamesSet.size === subjectNames.length

    // Ensures only 3H2s + 1H1 / 4H2s are allowed
    let h1Count = 0
    let h2Count = 0
    
    for (let i = 0; i < 4; i++) {
        let subjectName = subjectNames[i].options[subjectNames[i].selectedIndex].text
        if (subjectName.startsWith("H2")) {
            h2Count++
        }
        else {
            h1Count++
        }
    }

    if (h2Count <= 2 || !unique) {
        alert("Invalid Subject Combination!")
        return false
    }
    return true
}

function getSubjectScores() {
    let h1Subjects = []
    let h2Subjects = []
    let baseSubjects = []
    let potentialRebasedSubjects = [] // h1 mother tongue and worst h2 / h1

    let subjectNames = document.getElementsByClassName("subject-name-input")
    let scores = document.getElementsByClassName("subject-score-input")
    
    for (let i = 0; i < subjectNames.length; i++) {
        let subjectName = subjectNames[i].options[subjectNames[i].selectedIndex].text
        let score = scores[i].value
        
        if (subjectName === "O Level HMT") {
            let level = "O Level"
            let score = document.getElementById("HMT").value
            let rp = (gradeToRP[score] || 0)*0.5
        
            let subjectData = {
                subject: "HMT",
                level: level,
                rp: rp
            }
            h1Subjects.push(subjectData)
        }
        else if (subjectName != "Exempted") {
            let level = subjectName.startsWith("H2") ? "H2" : "H1"
            let rp = gradeToRP[score] || 0

            if (level === "H1") {
                rp *= 0.5
            }
        
            let subjectData = {
                subject: subjectName.replace(/^H[12] /, ""),
                level: level,
                rp: rp
            }

            if (level === "H1") {
                h1Subjects.push(subjectData)
            } else {
                h2Subjects.push(subjectData)
            }
        }
    }

    h2Subjects.sort((a, b) => b.rp - a.rp)

    if (h2Subjects.length === 3) {
        baseSubjects = [...h2Subjects, ...h1Subjects.filter(subject => subject.subject === "General Paper")]
        potentialRebasedSubjects = h1Subjects.filter(subject => subject.subject !== "General Paper")
    }

    if (h2Subjects.length === 4) {
        baseSubjects = [...h2Subjects.slice(0, 3), ...h1Subjects.filter(subject => subject.subject === "General Paper")]
        potentialRebasedSubjects = h1Subjects.filter(subject => subject.subject !== "General Paper")

        let worstH2 = h2Subjects[3]
        worstH2.rp *= 0.5
        potentialRebasedSubjects.push(worstH2)
    }

    return { baseSubjects, potentialRebasedSubjects }
}

function calculateUAS(baseSubjects) {
    let totalRP = 0

    baseSubjects.forEach(subject => {
        totalRP += subject.rp
    })

    return totalRP
}

function rebaseRP(RPBeforeRebase, potentialRebasedSubjects) {
    let bestScore = RPBeforeRebase
    let rebasedSubjects = []
    let notRebasedSubjects = []

    potentialRebasedSubjects.forEach(subject => {
        let individualScore = ((RPBeforeRebase + subject.rp) / 80) * 70
        if (individualScore > bestScore) {
            bestScore = individualScore
            rebasedSubjects = [subject]
        } else {
            notRebasedSubjects.push(subject)
        }
    })

    if (potentialRebasedSubjects.length === 2) {
        let combinedScore = ((RPBeforeRebase + potentialRebasedSubjects[0].rp + potentialRebasedSubjects[1].rp) / 90) * 70
        if (combinedScore > bestScore) {
            bestScore = combinedScore
            rebasedSubjects = [...potentialRebasedSubjects]
            notRebasedSubjects = []
        }
    }

    return { bestScore, rebasedSubjects, notRebasedSubjects }
}

function updateHTML(bestScore, baseSubjects, rebasedSubjects, notRebasedSubjects) {
    // Update "Your score"
    const scoreElement = document.getElementById("results")
    if (scoreElement) {
        scoreElement.textContent = `${bestScore.toPrecision(4)}rp`
    }

    // Update "Subjects used in H2 Calculation"
    const baseSubjectListElement = document.getElementById("subject-list")
    if (baseSubjectListElement) {
        baseSubjectListElement.innerHTML = ""

        baseSubjects.forEach(subject => {
            const listItem = document.createElement("li")
            listItem.textContent = `${subject.level} ${subject.subject}`
            baseSubjectListElement.appendChild(listItem)
        })
    }

    // Update "Subjects that were rebased"
    const rebasedSubjectListElement = document.getElementById("subject-rebased-list")
    if (rebasedSubjectListElement) {
        if (rebasedSubjects.length == 0)
            rebasedSubjectListElement.innerHTML = "None"
        else {
            rebasedSubjectListElement.innerHTML = ""

            rebasedSubjects.forEach(subject => {
                const listItem = document.createElement("li")
                listItem.textContent = `${subject.level} ${subject.subject}`
                rebasedSubjectListElement.appendChild(listItem)
            })
        }
    }

    // Update "Subjects that were NOT rebased"
    const notRebasedSubjectListElement = document.getElementById("subject-not-rebased-list")
    if (notRebasedSubjectListElement) {
        if (notRebasedSubjects.length == 0)
            notRebasedSubjectListElement.innerHTML = "None"
        else {
            notRebasedSubjectListElement.innerHTML = ""

            notRebasedSubjects.forEach(subject => {
                const listItem = document.createElement("li")
                listItem.textContent = `${subject.level} ${subject.subject}`
                notRebasedSubjectListElement.appendChild(listItem)
            })
        }
    }

    // Ensure that the results area is shown
    const resultsArea = document.getElementById("results-area")
    if (resultsArea) {
        resultsArea.style.display = "block"
        scroll({ top: resultsArea.getBoundingClientRect().top + window.scrollY, behavior: "smooth" })
    }
}


function updateResult() {
    if (validateSubjects()) {
        let { baseSubjects, potentialRebasedSubjects } = getSubjectScores()
    
        let RPBeforeRebase = calculateUAS(baseSubjects)
        let { bestScore, rebasedSubjects, notRebasedSubjects } = rebaseRP(RPBeforeRebase, potentialRebasedSubjects)
        updateHTML(bestScore, baseSubjects, rebasedSubjects, notRebasedSubjects)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit")

    submitButton.addEventListener("click", () => {
        updateResult()
    })
})
