//model
const Nutrimodel = require("../model/nutri");
//get all blogs
const get_allblogs = (req,resp)=>{
    const title = "blog";
    Nutrimodel.find().sort({createdAt:-1})
    .then((result)=>{
        resp.render("blog",{title,blogs:result});
    }).catch(err=>{
        console.log(err);
    })
}
//create a blog
const create_blog = (req,resp)=> {
    const title = "create";
    resp.render("create",{title})
}
//save blog
const save_blog = (req,resp)=>{
    //returns an object with key and value jst like the model 
console.log(req.body);
const blog = new Nutrimodel(req.body);
blog.save().then(result=>{
resp.redirect("/")
}).catch(err=>{
    console.log(err);
})
}

//get specific blog
const get_ablog =  (req,resp)=>{
    const id = req.params.id;
    Nutrimodel.findById(id).then(result=>{
        resp.render("details",{det:result,title:"Blog Detail Page"})
    })
    }
const delete_blog = (req,resp)=>{
    const id = req.params.id;
Nutrimodel.findByIdAndDelete(id).then(()=>{
    //send back a redirect in json to the frontend upon deleting
        resp.json({redirect:"/blogs"});
    }).catch(err=>{
        console.log(err)
})
}
module.exports = {
    get_allblogs,
    create_blog,
    save_blog,
    get_ablog,
    delete_blog
}