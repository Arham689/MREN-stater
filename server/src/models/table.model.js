import mongoose, { Schema } from "mongoose";

const TableSchema = new Schema({
    className: { type: Schema.Types.ObjectId, ref: 'ClassName', required: true },
    medium: { type: Schema.Types.ObjectId, ref: 'Medium', required: true },
    subjects: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    bookName: { type: String, required: true }
});

const ClassSchema = new Schema({
    name: { type: String, required: true, unique: true }
});
export const ClassName = mongoose.model('ClassName', ClassSchema);

const SubjectSchema = new Schema({
    name: { type: String, required: true, unique: true }
});
export const Subject = mongoose.model('Subject', SubjectSchema);

const MediumSchema = new Schema({
    name: { type: String, required: true, unique: true }
});
export const Medium = mongoose.model('Medium', MediumSchema);


// async function seedDatabase() {
//     await mongoose.connect('mongodb://localhost:27017');

//     // Insert Classes
//     const class1 = await ClassName.create({ name: '1st' });
//     const class2 = await ClassName.create({ name: '2nd' });
//     const class3 = await ClassName.create({ name: '3rd' });

//     // Insert Subjects
//     const science = await Subject.create({ name: 'Science' });
//     const maths = await Subject.create({ name: 'Maths' });
//     const sst = await Subject.create({ name: 'SST' });

//     // Insert Mediums
//     const english = await Medium.create({ name: 'English' });
//     const hindi = await Medium.create({ name: 'Hindi' });

//     console.log('Data Inserted Successfully');
//     mongoose.connection.close();
// }

// seedDatabase();

const Table = mongoose.model('ModelName', TableSchema);
export default Table ;