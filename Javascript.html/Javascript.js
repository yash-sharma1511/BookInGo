<script>

var Message_Banner = document.getElementById("Message_Banner");
var Message_Banner2 = document.getElementById("Message_Banner2");
window.addEventListener('load',dofirst,false);

function dofirst(){
  console.log("we are in do first");
}

function clearMSG(){
  console.log('clearMSG');
  Message_Banner.innerHTML = "";
}

function addBook(){
  Message_Banner.innerHTML = "";
  console.log('add book pressed');
  var title = document.getElementById('title').value;
  var author = document.getElementById('author').value;
  var isbn = document.getElementById('isbn').value;
  var genre = document.getElementById('genre').value;
  var Bookid = document.getElementById('Bookid').value;
  var publishedYear = document.getElementById('publishedYear').value;

  var newBook = [title,Bookid,author,isbn,genre,publishedYear];
  
  google.script.run.withSuccessHandler(onInsertRow).insertRow(newBook);

}

function onInsertRow(){
  Message_Banner.innerHTML = "Succesfully inserted new book";
  Message_Banner.style.color = "#00FF00";
  Message_Banner.style.display = "block";

}

function checkOutBook(){
  
  console.log('checkout book pressed');
  
  Message_Banner.innerHTML = "";
  
  var Bookid2 = document.getElementById('Bookid2').value;
  var BorrowerName = document.getElementById('BorrowerName').value;
  var BorrowerEmail = document.getElementById('BorrowerEmail').value;

  var CheckoutData = [Bookid2,BorrowerName,BorrowerEmail];

  console.log('CheckoutData:'+CheckoutData);
  
  google.script.run.withSuccessHandler(onCheckout).getcheckOutBook(CheckoutData);

}

function onCheckout(checkOutBack){

   console.log('checkOutBack:'+checkOutBack);

  if (checkOutBack == 1){
    Message_Banner.innerHTML = "Succesfully Checkout new book. Email sent.";
    Message_Banner.style.color = "#00FF00";
    Message_Banner.style.display = "block";
    
  }

    if (checkOutBack == 3){
    Message_Banner.innerHTML = "Could not Checkout new book.Book not found.";
    Message_Banner.style.color = "#FF0000";
    Message_Banner.style.display = "block";
  }

    if (checkOutBack == 2){
    Message_Banner.innerHTML = "Could not Checkout new book.Book Already checkedout.";
    Message_Banner.style.color = "#FF0000";
    Message_Banner.style.display = "block";
  }

}

function checkinBook(){
  
  console.log('checkin book pressed');
  
  Message_Banner.innerHTML = "";
  
  var Bookid3 = document.getElementById('Bookid3').value;

  var CheckinData = [Bookid3];

  console.log('CheckinData:'+CheckinData);
  
  google.script.run.withSuccessHandler(onCheckin).getcheckInBook(CheckinData);

}

function onCheckin(checkInBack){

   console.log('checkinBack:'+checkInBack);

  if (checkInBack == 1){
    Message_Banner.innerHTML = "Succesfully Checkin book. Email sent.";
    Message_Banner.style.color = "#00FF00";
    Message_Banner.style.display = "block";
    
  }

    if (checkInBack == 3){
    Message_Banner.innerHTML = "Could not Checkin book.Book not found.";
    Message_Banner.style.color = "#FF0000";
    Message_Banner.style.display = "block";
  }

    if (checkInBack == 2){
    Message_Banner.innerHTML = "Could not Checkin book.Book Already checkedin.";
    Message_Banner.style.color = "#FF0000";
    Message_Banner.style.display = "block";
  }

}

function Feedback(){
  console.log("feedback");
  Message_Banner2.innerHTML = "";

  var Namef = document.getElementById('Namef').value;
  var Emailf = document.getElementById('Emailf').value;
  var yourself = document.getElementById('yourself').value;

  var feedbackdata = [Namef,Emailf,yourself];

  google.script.run.withSuccessHandler(onfeedback).doFeedback(feedbackdata);

}

function onfeedback(){

   console.log('onfeedback:');


  Message_Banner2.innerHTML = "Feedback Sent:";
  Message_Banner2.style.color = "#6B240C";
  Message_Banner2.style.display = "block";
  


}




























</script>