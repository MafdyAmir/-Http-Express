
const { error } = require('console');
const { response } = require('express');
const http = require('http');    // step.1 stored http module in require(There are a codes inside this module i use it so i require and store it)

const port =5000;

let users =[                   //step.4 create array 
    {id:2 ,name:"ail", age:21 ,email:"ail@gmail.com"},
    {id:4 ,name:"omer", age:22 ,email:"omer@gmail.com"},
    {id:6 ,name:"mansor", age:20 ,email:"mansor@gmail.com"},
    {id:8 ,name:"salma", age:18 ,email:"salma@gmail.com"},
    {id:10 ,name:"amira", age:30, email:"amira@gamil.com"},
    {id:12 ,name:"ragabe", age:45,email:"ragabe@gmail.com"},
    {id:12 ,name:"john", age:45,email:"john@gmail.com"},

]
let posts = [
  { id: 5, titil: "foodball", content: "mohamed salah" },
  { id: 10, titil: "programming", content: "node.js" },
  { id: 15, titil: "heathy", content: "healsy foods" },
  { id: 20, titil: "salfcare", content: "fashion" },
  { id: 25, titil: "good hapits", content: "reading" },
  { id: 30, titil: "gam", content: "arm training" },
  { id: 30, titil: "Technology", content: "ChatGPT" },
];
let newArray=[];

/**
 * step.2 create server and take req back res than midullwhere = (next)
 * step.5 create url & method & sand request and get response 
 */
const server = http.createServer((req,res,_next)=>{   
                                                    
    const url = req.url;
    const method = req.method;
    
    
    if (req.url == "/getUsers" && method == "GET") { //here we get all users and sorted alphabetically by name   
          
        const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
        console.log(sortedUsers);
           res.write(JSON.stringify(users))
           res.end()

    }else if(url == "/add-user" && method == "POST"){
        let bufferdData;
        req.on("data",(chuck)=>{        //we use {event} here that means =>  request the response in Place i will get you it
          bufferdData = chuck
    
        })
        req.on("end",()=>{
            let convertedData = JSON.parse(bufferdData);
            console.log(convertedData);
            const isExist = users.find(user=>{
                return user.email == convertedData.email;
            })
            if (isExist) {                               //this way is not good to my performance so we use another way to delete
                  res.write("this Email isExist")
                 return res.end()
            }else{
                users.push(convertedData)
                res.write("Email has been added successfully...")
                res.end()
            }  

        })

    }else if (url == "/delete-user" && method == "DELETE") {
        let bufferdData;
        req.on("data",(chuck)=>{        
          bufferdData = chuck
          
        })
        req.on("end", ()=>{
            let convertedData = JSON.parse(bufferdData)
              newArray = users.filter(user => {
                return user.email != convertedData.email
            })
         }) 

         if (newArray.length == users.length ) {
            res.write("This Email doesn't Exist!")
            res.end();
         } else {
            users == newArray;
            res.write("The Email has been deleted successfully...");
            res.end();
         }
         
        
    }else if (url == "/update-user" && method =="PUT") {
        let bufferdData;
        req.on("data",(chuck)=>{
            bufferdData = chuck;
        })
        req.on("end",()=>{
             let convertedData = JSON.parse(bufferdData)
            console.log(convertedData);
            const user = users.find(user=>{
                return user.name == convertedData.name;
            })
            const userIndex = users.indexOf(user)
            if (user) {
                users[userIndex] = convertedData;
                res.write("User Updated Successfully...")
                res.end();

            }else{
                res.write("This User dosen\'t Exist!")
                res.end();
            }
            
        })
        
    }else if (url == "/getOneuser" && method == "GET") {
        let bufferdData;
        req.on("data",(chuck)=>{
            bufferdData = chuck;
        }) 
        req.on("end",()=>{
             let convertedData = JSON.parse(bufferdData)
            console.log(convertedData);
            const userID = users.find(userID=>{
                return userID.id == convertedData.id;
            })
            console.log(users);
            if (userID) {
                res.write(JSON.stringify(userID))
                res.end()
            }else{
                res.write("This User dosen\'t Exist!")
                res.end()
            }
        })

        //*start Posts *//
    }else if (url =="/getPosts-reversed" && method == "GET") {   // Get all Posts reversed
        let bufferdData;
        req.on("data",(chuck)=>{
            bufferdData = chuck
        })
         req.on("end", ()=>{
            let convertedData = JSON.parse(bufferdData)
            console.log(convertedData);
            const reversedPosts = posts.slice().reverse();
            console.log(reversedPosts);
         })
         res.write(JSON.stringify(posts))
         res.end()

    }else if (url =="/add-post" && method =="POST" ) {
        let bufferdData;
        req.on("data",(chuck)=>{
            bufferdData = chuck
        })
        req.on("end",()=>{
            let convertedData = JSON.parse(bufferdData)
            console.log(convertedData);
            const isExist = posts.find(post=>{
                return post.titil == convertedData.titil;
            })
            if (isExist) {                               //this way is not good to my performans so we use another way to delete
                  res.write("this Post isExist")
                 return res.end()
            }else{
                posts.push(convertedData)
                res.write("Post has been added successfully...")
                res.end()
            }  

            });


    }else if (url == "/update-post" && method == "PUT") {
        let bufferdData;
        req.on("data",(chuck)=>{
            bufferdData = chuck;
        })
        req.on("ene",()=>{
            let convertedData = JSON.parse(bufferdData)
            console.log(convertedData);
            const post = posts.find(post=>{
                return post.titil == convertedData.titil
            })
            const postIndex = post.indexOf(post)
            if (post) {
                posts.postIndex = convertedData;
                res.write("Post Update Successfully...")
                res.end();
            }else{
                res.write("This Post Dosen\'t Exist!")
                res.end();
            }
        })


    }else if (url =="/delete-post" && method == "DELETE") {
        let bufferdData;
        req.on("data",(chuck)=>{
            bufferdData = chuck
        })
        req.on("end",()=>{
            let convertedData = JSON.parse(bufferdData);
            console.log(convertedData);
            const post = posts.find(post =>{
                return post.id == convertedData.id
            })
            const postIndex = users.indexOf(post)
            if (post) {
                posts.splice(postIndex,1)
               res.write("This Post Dosen\'t Exist!")
               res.end(); 
            }else{
                res.write("The Post has been deleted successfully...")
                res.end();
            }
           
        })

    }else if (url == "/getOnepost" && method =="GET") {
        let bufferdData;
        req.on("data",(chuck)=>{
            bufferdData = chuck
        })
        req.on("end",()=>{
            let convertedData = JSON.parse(bufferdData)
            console.log(convertedData);
            const postID = posts.find(postID=>{
                return postID.id == convertedData.id;
            })
            console.log(posts);
            if (postID) {
                res.write(JSON.stringify(postID))
                res.end()
            }else{
                res.write("This Post dosen\'t Exist!")
                res.end()
            }
        })


    }
   
    
    else{
        res.write("404 Not Found")
        res.end()
    }


})

server.listen(port,()=>{     // step.3 create port(the gate that req&res will pass from it ) and cheak the server is Runing or not
    console.log(
        `server is Runing on port ${port} `
    );    
});

//-----------------start express-----------------//

// const express = require('express')
// const app = express()               //{app} is Containing all methodes of express
// const port =5000;




// app.use(express.json())         //To receve diract data in {json} wihtout need to converted it by parse

// app.get('/getUsers', (req, res, next) =>{   //Get all users sorted alphabetically by name 
//     req.body = users;    
//     const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
//     console.log(sortedUsers);
//     res.json(users)
//   })
  
// app.get('/search-user/:id',(req, res, next) =>{    //get by params
//    console.log(req.params);
//    const { id } = req.params
//    const user = users.find((user)=>{
//     return user.id == id
//    })
//    if (user) {
//     return res.json({message:"Done...", user})
//    }else{
//     return res.json({message:"This User Dosen\'t Founde"})
//    }
   
// })
   

// app.post('/add-user', (req, res, next) =>{
//    const { email } = req.body;
//    const isExist = users.find(user=>{
//     return user.email == email;
// })
//    if (isExist) {                               
//     return res.json({message:"this Email isExist"})

//     }else{
//          users.push(users)
//      return res.json({message:"Email has been added successfully..."}) 
//          }  
//   })

//   app.patch('/update-user',(req, res, next) =>{
//     const { name , age ,email } = req.body
//     let isExist = false  
//      users = users.map(user=>{
//         if (user.email == email) {
//             user.age = age
//             user.name = name
//             isExist = true
//             return user
//         }else{
//             return user
//         }
        
//       })
//      if (isExist) {
//        return res.json({message:"User Updated Successfully..."})
//      }else{
//         return res.json({message:"This User dosen\'t Exist!"})
//      }
        
        
//   })
  
//   app.delete('/delete-user',(req, res, next) =>{
//     const { email } =req.body
//     const user = users.find(user=>{
//         return user.email == email;
//     })
//     const userIndex = users.indexOf(user)
//     if (user) {
//         users.splice(userIndex,1)
//         res.json({message:"User Deleted Successfully..."})
//     }else{
//         res.json({message:"This User doesn\'t Exist!"})
//     }
 
//   })

// ////////////*start posts *//////////////

// app.get('/getPosts',(req, res, next) =>{
//     res.json({ posts })
//   })

//   app.get('/getPosts-reversed', (req, res, next) =>{         //Get all Posts reversed (but don't change the order of the main array)
//     req.body = posts
//     const reversedPosts = posts.slice().reverse();
//     console.log(reversedPosts);
//     res.json({reversedPosts})
//   })
 
//   app.get('/search-post/:id',(req, res, next) =>{
//     console.log(req.params);
//     const { id } = req.params
//     const post = posts.find((post)=>{
//      return post.id == id
//     })
//     if (post) {
//      return res.json({message:"Done...", post})
//     }else{
//      return res.json({message:"This Post Dosen\'t Founde"})
//     }
//   })


//   app.post('/add-Post',(req, res, next) =>{
//     const { titil } = req.body;
//     const isExist = posts.find(post=>{
//     return post.titil == titil;
// })
//    if (isExist) {                               
//     return res.json({message:"this Post isExist"})

//     }else{
//          users.push(posts)
//      return res.json({message:"Post has been added successfully..."}) 
//          } 
//   })

//   app.patch('/update-Post',(req, res, next) =>{
//     const { titil , content } = req.body
//     let isExist = false  
//      posts = posts.map(post=>{
//         if (post.titil == titil) {
//             post.content = content
//             isExist = true
//             return post
//         }else{
//             return post
//         }
        
//       })
//      if (isExist) {
//        return res.json({message:"Post Updated Successfully..."})
//      }else{
//         return res.json({message:"This Post dosen\'t Exist!"})
//      }
       
//   })

//   app.delete('/delete-post',(req, res, next) =>{
//     const { titil } =req.body
//     const post = posts.find(post=>{
//         return post.titil = titil;
//     })
//     const postIndex = posts.indexOf(post)
//     if (post) {
//         users.splice(postIndex,1)
//         res.json({message:"Post Deleted Successfully..."})
//     }else{
//         res.json({message:"This Post doesn\'t Exist!"})
//     }
//   })

 

// app.all('*', (req, res) => {
//     res.json({ message: "invalid url" })
// })

// app.listen(port, ()=> {
//     console.log(`server {Exepress} is Runing on port ${port} `);
// })



