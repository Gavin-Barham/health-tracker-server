function setNutritionFields(reqObj, dbRowObj) {
    let nutritionFields = {
    breakfast: reqObj.breakfast || dbRowObj.breakfast,
    lunch: reqObj.lunch || dbRowObj.lunch,
    dinner: reqObj.dinner || dbRowObj.dinner,
    snacks: reqObj.snacks || dbRowObj.snacks,
    }
    return nutritionFields
}

function setMedicalFields(reqObj, dbRowObj) {
    let medicalFields = {
        oxygen: reqObj.oxygen || dbRowObj.oxygen,
        heart_rate: reqObj.heart_rate || dbRowObj.heart_rate,
        blood_pressure: reqObj.blood_pressure || dbRowObj.blood_pressure,
        blood_glucose: reqObj.blood_glucose || dbRowObj.blood_glucose,
        weight: reqObj.weight || dbRowObj.weight,
        medication: reqObj.medication || dbRowObj.medication,
    }
    return medicalFields
}

function setExerciseFields(reqObj, dbRowObj) {
    let exerciseFields = {
        weight: reqObj.weight || dbRowObj.weight,
        daily_steps: reqObj.daily_steps || dbRowObj.daily_steps,
        miles: reqObj.miles || dbRowObj.miles,
        calories_burned: reqObj.calories_burned || dbRowObj.calories_burned,
        sleep: reqObj.sleep || dbRowObj.sleep,
    }
    return exerciseFields
}

module.exports = {setNutritionFields, setMedicalFields, setExerciseFields}