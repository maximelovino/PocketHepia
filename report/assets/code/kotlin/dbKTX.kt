//Without Android KTX
db.beginTransaction()
try {
    // insert data
    db.setTransactionSuccessful()
} finally {
    db.endTransaction()
}

//With Android KTX
db.transaction {
    // insert data
}