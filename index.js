import express from "express";
import bodyparser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import { render } from "ejs";


const db= new pg.Client({
    user: "postgres",
    host:"localhost",
    database:"world_wheat",
    password:"Dinesh@123",
    port:"5432"
    });
    db.connect();
const _dirname=dirname(fileURLToPath(import.meta.url));
const app=express();
const port=3000;

const products=[{id:0,classification:"shirts",name:"shirts",img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_an8xAFyHxdX3x5OcJkzv4c_r4lysh5jbyShVSn742kZ_2MVGMRIrFG1cQ2vbYp7kIAPKHQ2qBBKUGIZhBjhPJXT5Sjwk93zUgMdtxnvfvIuj04O0ckiphjpI8EallHwE8PptCgWr-MM17THQ_i_IAMiQ4m6hGAy5DHMb2SUEvKeJM2caepQvKfUji6Q/s320/WhatsApp%20Image%202024-05-27%20at%2012.09.53_990b008c.jpg" ,price:499,discription:"T-shirt in midweight cotton jersey with a print motif, round, rib-trimmed neckline, dropped shoulders and a straight-cut hem. Loose fit for a generous but not oversized silhouette."},
    {id:1,classification:"shirts",name:"shirts",img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZlOYVpEKrzq6OHN64iba1KNf8yJsvjbiDzPnYbOcKdO0LLqeaiOiV9rA9fcgIpUxjYP-ZPnyzaSUeYn5ZuNCyDhSH-UKGlyQdJ5M2sUZVkyRO0LyaJ3gKEnwhjWasVhM_KKyIMkt0B7SzAhNlJdsIsBKa_bvftS-vef4528oJ0aJW6IHYoSM5Hf5qsY0/s320/WhatsApp%20Image%202024-05-27%20at%2012.07.56_1120f207.jpg",price:2999,discription:"Shirt in crinkled jersey with a resort collar, French front, short sleeves and a straight-cut hem. Regular fit for comfortable wear and a classic silhouette"},
    {id:2,classification:"shorts",name:"short",img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNM7N5w9n345pDabxRTN6wLsY7fE3fqpZUHHEdW_p49Y-OAKBQxOUTiFS9jc2VeHnqSNOV1yloboeZQO9IUpYOkYoeIMEGmRWxlTSyzrWxQxmmAsy9SsfUPS8B44HFRIinC6BY4D6-dq85LfEQtYS1DhYqqYGtBTFtp1ua42gC_aVs7Uxyagvk0Q5dRtY/s320/WhatsApp%20Image%202024-05-27%20at%2012.10.55_fa05ac76.jpg",price:699,discription:"lShorts in printed mesh with an elasticated, drawstring waist, side pockets and a slit at the side of the hems. Loose fit for a generous but not oversized silhouette"},
    
    {id:3,classification:"pants",name:"pants",img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhseukcr1SsbsjTZq4WEqz0SI5ABvdTQ1AB8RnM0XmGk_vRx0A74_tB9UgCSl_kIbLyKZzFXp6NJ6t7Ap6MkKKup5Fuk3ySUasicdXg4cwg5vsZ1APazu47Y1kXo0GS1EEM-Wl28AF111FAfqJTr5SY6Rpa6ylLYmSFIUBnkMddIsQx2SZhbPRRhTKKQ14/s320/WhatsApp%20Image%202024-05-27%20at%2012.01.45_4fd41462.jpg",price:1999,discription:"Sweatpants in lightweight sweatshirt fabric made from a cotton blend with a soft brushed inside. Covered elastication and a drawstring at the waist, pockets in the side seams and ribbed hems. Regular fit for comfortable wear and a classic silhouette. "},
    {id:4,classification:"shoes",name:"shoes",img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVp8n3e5HklG7AI2KED0946iktoRnQtAu-JWIpf5kk5XkwBpDV1valEZW0cu6a-NIqMkVXwf4gRdoLLxtVXlW-h0xULA5QbzJGpOWiibXID2b1IVleUOcWRieuwd_OAz1mChRMlSbZpiaevO_jwgKqydZ69gb7wTVBeAcJuJWVEnwyZgPWJjTizfknIx0/s320/WhatsApp%20Image%202024-05-27%20at%2012.11.54_48c846f8.jpg",price:2999,discription:"Derby shoes in soft imitation suede with open lacing. Cotton canvas linings and insoles and patterned soles. Heel 2 cm. "},
    {id:5,classification:"sandals",name:"sandals",img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiM8W8tRXlyRevW-WREj-wEFe_WdXkU-eQg89aLKhALbbnJS4HRloBnPQSqVtg4ztRRu-873zxQrogPRRt9QZHpC1BBdgAUbEvM2lLVlMD7UdVvkBD12JPH9bAHkgkHZDJrrRch8RQi2LE4_5oRGNUuy8tHqno0f7nO_Tvd3VSavuCbsozIS4CU4iZh8vQ/s320/WhatsApp%20Image%202024-05-27%20at%2012.13.50_aa424e5d.jpg",price:1799,discription:"The BIRKENSTOCK Ramses is the mens version of the popular Gizeh thong sandal. The slightly wider strap lends this sandal a strikingly masculine appearance. The upper is made from the skin-friendly, hard-wearing synthetic material Birko-Flor®.    "},
 {id:6,classification:"shirts",name:"shirts", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEge9zMIs_0RScbR3pkqfvoYLmPisVobbl0juSNpHqxDjiIXiaL55G5HmWZ0DSsy7G2nhyei2Ro_CiWukjQLqM061ZzoAFjwoBXhCaHMTtnBz9Ftp9mMCfqB0zvZTcB1lUnf1_3VrjV086H7ky3TQuxdmhbgYL9KjW6cnaEdTxdN1lRDw62Z1SEKRlCrAr4/s320/WhatsApp%20Image%202024-05-27%20at%2012.07.06_c529cea0.jpg",price:599,discription:"Short-sleeved shirt in a cotton weave with a turn-down collar, classic front, yoke at the back, chest pocket and a rounded hem. Regular fit for comfortable wear and a classic silhouette. "},
 {id:7,classification:"pants",name:"pants", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBMEZLWD_zJYa7ncc-vLEPsaLjoJ29rBTiJLr25r4cylilUHcZ2D6K5ya-TJfCklm-z9QPCiVf0lfPC-0fBKlI-8_JlWT9k0-eg3T2Q9-eoIjSyIQ4EkRgCOr6ARrfXjeIJUa6feHR6evBnm_44dMu9WVcus_y7tYLhW7gsWiRd8NRNHhxWNwPaYF5Ack/s320/WhatsApp%20Image%202024-05-27%20at%2012.03.40_42b49b2f.jpg",price:799,discription:"Regular-fit trousers in a soft weave with a zip fly and an extended waistband with a button and hook-and-eye fastening. Diagonal side pockets and jetted back pockets with a button. "}]
let cart=[];
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("login.ejs");
});
app.get("/login",(req,res)=>{
    res.render("login.ejs");
});
app.get("/create",(req,res)=>{
    res.render("signup.ejs");
});
app.get("/home",(req,res)=>{
  res.render("index.ejs",{products});

}
);
app.post("/continue",async(req,res)=>{

    const email=req.body.email;
    const enteredpassword=req.body.password;
  
    console.log(email);
    console.log(enteredpassword);
    
   const data= await db.query("select * from login where email=$1",[email,]);
   console.log(data.rows[0]);
   console.log(data.rows[0].password);
   let username =data.rows[0].username;
   console.log(username);
   if(data.rows.length>0){
     if(enteredpassword===data.rows[0].password){

        res.render("index.ejs",{user:username,products});
     }
     else{
        res.send("enter correct password.");
     }
   }
    else{
    res.send("email id does not exists.");
    }

   
});
app.post("/product",(req,res)=>{
    const productId=req.body.productId;
    console.log(productId);
    
    
console.log(products[productId-1]);
const product=products[productId];

    res.render("product.ejs",{product});
})

app.post("/continues",async(req,res)=>{
    const name=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    console.log(name);
    console.log(email);
    console.log(password);
   const data= await db.query("select email from login where email=$1",[email,]);
   if(data.rows.length>0){
    res.send("email already exists.");
   }
    else{
    await db.query("INSERT INTO login (username,email,password) VALUES ($1,$2,$3)",[name,email,password]);
    res.redirect("/login");
    }

});
app.post("/addtocart",(req,res)=>{
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  console.log(quantity);
  const product = products[productId];
console.log(product);
  if (product) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += parseInt(quantity, 10);
      console.log(cartItem.quantity);
    } else {
      cart.push({ product, quantity: parseInt(quantity, 10) });
    }
  }

res.render("cart.ejs",{cart});
});
app.get('/cart', (req, res) => {
  res.render("cart.ejs", { cart });
});

app.post('/remove-from-cart', (req, res) => {
    const productId = parseInt(req.body.productId);
    cart = cart.filter(item => item.product.id !== productId);
    res.render("cart.ejs",{cart});
  });


app.listen(port,()=>{
    console.log(`listening from ${port}`);
});

