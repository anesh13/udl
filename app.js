const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//mysql connection
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'anesh13',
    password: 'anesh13',
    database: 'lessons'
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

const aboutContent1 = "   Snowflake learning is a student-driven organization working to celebrate differences in learning. Just like how each snowflake is unique, each student has their own unique style when it comes to learning. Snowflake helps students learn on their own terms with styles that suit them so that each individual can unlock hidden treasures within themselves. ";
const aboutContent2 = "   We incorporate principles of UDL ( Universal Design of Learning) in all our educational videos. We cater to students k-12 and offer a variety of subjects. All our videos contain both audio and visual forms of learning, with summarized content. This allows students to easily absorb material without having to tediously read pages of text. ";
const aboutContent3 = "   If you have any questions please contact us at —----@gmail.com ";
const mission = " Snowflakes aim to reduce the anxieties involved with learning by providing students with different modes of learning that cater to each student’s needs. We strive to ensure that each student feels accommodated and comfortable when they learn. Inclusivity is the main component of our mission. Snowflake hopes to advocate, educate, and foster inclusive learning in schools.";
const problem = " It has been reported that 1 in 5 individuals have learning differences and/or attention-related issues. This makes it incredibly hard for some students to thrive in a traditional learning environment. This is why Snowflake celebrates students who have different learning styles  and gives them the opportunity to unlock treasures within themselves. ";
const solution = "We create comprehensive, educator-approved, and UDL-based videos that proved alternative means for learning. Each video includes auditory and visual components of the learning material along with summarized notes, diagrams, and key terms. ";
const quote = "Everybody is a genius, but if you judge a fish by the ability to climb a tree, it will live its whole life believing that is stupid. – Albert Einstein.";
const port = process.env.PORT || 9080;
const app = express();

app.set("view engine", "ejs");
app.set('port', process.env.port || port);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
var lesson = {};
let grade ={};
let subject = {};
var lesson ={};
var data ={};
var sql = "SELECT * FROM lesson";
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            lesson = result;
          }
        });
var gradequery = "SELECT * FROM grade";
    connection.query(gradequery, function (err, result) {
        if (err) {
            throw err;
        } else {
             grade = result;
        }

    });
var subjectquery =  "SELECT * from subject";
connection.query(subjectquery, function (err, result) {
    if (err) {
        throw err;
    } else {
         subject = result;
    }

});

function dataAdd(lesson, grade, subject){

  Object.keys(lesson).forEach(function(key) {
    Object.keys(grade).forEach(function(ind) {
    if (lesson[key].grade_id == grade[ind].grade_id ) {
      lesson[key].grade = grade[ind].grade;
      lesson[key].grade_id = grade[ind].grade_id;
    }
   });
   Object.keys(subject).forEach(function(ind) {
   if (lesson[key].subject_id == subject[ind].subject_id ) {
     lesson[key].subject = subject[ind].subject;
     lesson[key].subject_id = subject[ind].subject_id;
   }
  });
  });
  return lesson;
}
function populate(lesson, grade, subject){
console.log("JSON lesson obj : " + JSON.stringify(lesson));
var data ={};
lesson = dataAdd(lesson, grade, subject);
Object.keys(lesson).forEach(function(key) {
  data[lesson[key].grade_id]= [];
var temp = {};
Object.keys(grade).forEach(function(ind) {
    var sub = 0;
    var gra = grade[ind].grade_id;
  if(grade[ind].grade == lesson[key].grade)
  {
    temp = getTemp(lesson, gra, subject);
    temp = clean(temp);
    data[gra].push(temp);
  }
});
});
Object.keys(data).forEach(function(key) {

  var temp = data[key];
    console.log("data. grade_id" +  JSON.stringify(temp[0]));
  console.log("     hsjahakhfrh    "+JSON.stringify(Object.keys(temp[0])));
  Object.keys(temp[0]).forEach(function(index) {
    console.log("data. grade_id.sub" +  JSON.stringify(index));

  });

});
console.log("result  data" +  JSON.stringify(data));

return data;
}


function getTemp(lesson, grade, subject){
  var temp ={};
  var sub = "";
  var gra = 0;
  Object.keys(lesson).forEach(function(key) {
    temp[lesson[key].subject]=[];
  });
  Object.keys(lesson).forEach(function(key) {
    gra = lesson[key].grade_id;
    if(gra == grade){
      console.log("gra  "+ gra);
    Object.keys(subject).forEach(function(index) {
       sub = subject[index].subject;
       console.log("sub  " +  sub);

      if(lesson[key].subject_id == subject[index].subject_id)
      {
        console.log("lesson  "+JSON.stringify(temp))
        temp[sub].push(lesson[key]);
  }

});
if( temp[lesson[key].subject].length == 0 ){
  console.log("Helloooo    " + JSON.stringify(temp[lesson[key].subject_id]) + "   " + lesson[key].subject_id)
  delete temp[lesson[key].subject_id];
}
}

});
return temp;
}

const removeEmptyOrNull = (obj) => {
     Object.keys(obj).forEach(k =>
       (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
       (!obj[k] && obj[k] !== undefined) && delete obj[k]
     );
     return obj;
   };
  function clean(obj) {
    console.log("inside clean");
     for (var propName in obj) {
       if (obj[propName] === null || obj[propName] === undefined || obj[propName] === [] || obj[propName].length == 0) {
         console.log("inside if ");
         delete obj[propName];
       }
     }
     return obj
   }

app.get("/", function (req, res) {

  var sql = "SELECT * FROM lesson";
      connection.query(sql, function (err, result) {
          if (err) {
              throw err;
          } else {
              obj = result;
              data = populate(result, grade, subject);
              res.render('home', {data: data, lesson: result, grade: grade, subject : subject});
              // console.log("result  " +  JSON.stringify(result));
          }
      });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent1: aboutContent1 , aboutContent2: aboutContent2, aboutContent3: aboutContent3, mission : mission, solution : solution, problem : problem, quote: quote});
});

var obj = {};
app.get("/contact", function (req, res) {

    var sql = "SELECT * FROM need";
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            } else {
                obj = result;
                res.render('contact', {obj: result});
            }
            // console.log("hello" + JSON.stringify(result));
        });

});
var lesson = {};
app.get('/video/:grade_id/:lesson_id', function(req,res){
  var grade_id = req.params.grade_id;
  var lesson_id = req.params.lesson_id;
  var sql1 = "SELECT * FROM lesson where grade_id = "+ grade_id +" and lesson_id = " + lesson_id;
  var sql2 ="SELECT grade FROM grade where grade_id = " + grade_id;
  connection.query(sql1 , function (err, result) {
      if (err) {
          throw err;
      } else {
        lesson = result[0];
        data = populate(result, grade, subject);
        // console.log("lesson json" + JSON.stringify(lesson));
        res.render('lesson', { lesson : lesson});
      }

});
});
app.post("/contactform", function (req, res) {
  console.log(req.body);
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let need = req.body.need;
  let message = req.body.message;
  var sql = "INSERT INTO contact (f_name, l_name, email, need, message) VALUES ("+fname+", "+lname+","+email+","+ need +", "+message+")";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log('Row has been updated');
    req.flash('success', 'Data stored!');
    res.redirect('/')
  });
  // const day1 = new blog({
  //   title: title,
  //   postContent: content,
  // });
  // day1.save();
  // res.redirect("/");
});
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
