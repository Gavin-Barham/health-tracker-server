function setNutritionFields(reqObj, dbRowObj) {
    let nutritionFields = {
    daily_steps: reqObj.dailySteps || dbRowObj.daily_steps || null,
    first_meal_cal: reqObj.firstMealCal || dbRowObj.first_meal_cal || null,
    first_meal_time: reqObj.firstMealTime || dbRowObj.first_meal_time || null,
    second_meal_cal: reqObj.secondMealCal || dbRowObj.second_meal_cal || null,
    second_meal_time: reqObj.secondMealTime || dbRowObj.second_meal_time || null,
    snack_cal: reqObj.snackCal || dbRowObj.snack_cal || null,
    exercise_cal: reqObj.exerciseCal || dbRowObj.exercise_cal || null,
    exercise_time: reqObj.exerciseTime || dbRowObj.exercise_time || null
    }
    return nutritionFields
}

function setMedicalFields(reqObj, dbRowObj) {
    let medicalFields = {
        oxygen: reqObj.oxygen || dbRowObj.oxygen || null,
        heart_rate: reqObj.heartRate || dbRowObj.heart_rate || null,
        blood_pressure: reqObj.bloodPressure || dbRowObj.blood_pressure || null,
        blood_glucose: reqObj.bloodGlucose || dbRowObj.blood_glucose || null,
        weight: reqObj.weight || dbRowObj.weight || null,
        morning_meds: reqObj.morningMeds || dbRowObj.morning_meds || null,
        noon_meds: reqObj.noonMeds || dbRowObj.noon_meds || null,
        evening_meds: reqObj.eveningMeds || dbRowObj.evening_meds || null,
    }
    return medicalFields
}

module.exports = {setNutritionFields, setMedicalFields}