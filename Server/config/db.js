import { connect } from "mongoose";

export function connectToDb() {
    connect("mongodb+srv://tamar:214872038@cluster0.4z38d.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0")
        .then(con => console.log("mogo Db connected"))
        .catch(err => {
            console.log("cannot connect mongo db", err);
            process.exit(1)
        })
}