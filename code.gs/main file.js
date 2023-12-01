const SHEET = '1y7Mb7aFSO4RHb1En6pRNnpskCTYkrkDlBGB6DKxBySw';
var TodayDate = new Date();

function doGet(e) {
  let page = e.parameters.s;
  console.log('we are in doget');
  if (page == null){
    return HtmlService.createTemplateFromFile('Home').evaluate();
  }else{
    return HtmlService.createTemplateFromFile(page).evaluate();

  }
  
}

var scriptUrl = getScriptUrl();

function getScriptUrl(){
  var url;
  url = ScriptApp.getService().getUrl();
  console.log('This is URL :'+url);
  return url;
}

function include(filename){
  console.log('include invoked');
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function insertRow(parm){

  console.log('Trying to inset row:'+parm);
  
  var ss = SpreadsheetApp.openById(SHEET);
  var dataSheet = ss.getSheetByName('data');
  var getLastRow = dataSheet.getLastRow();

  dataSheet.getRange(getLastRow+1,1,1,1).setValue(parm[0]);
  dataSheet.getRange(getLastRow+1,2,1,1).setValue(parm[1]);
  dataSheet.getRange(getLastRow+1,3,1,1).setValue(parm[2]);
  dataSheet.getRange(getLastRow+1,4,1,1).setValue(parm[3]);
  dataSheet.getRange(getLastRow+1,5,1,1).setValue(parm[4]);
  dataSheet.getRange(getLastRow+1,6,1,1).setValue(parm[5]);
  
}

function doFeedback(parm){

  console.log('Trying to insert feedbackdata row:'+parm);
  
  var ss = SpreadsheetApp.openById(SHEET);
  var dataSheet = ss.getSheetByName('Feedback');
  var getLastRow = dataSheet.getLastRow();

  dataSheet.getRange(getLastRow+1,1,1,1).setValue(parm[0]);
  dataSheet.getRange(getLastRow+1,2,1,1).setValue(parm[1]);
  dataSheet.getRange(getLastRow+1,3,1,1).setValue(parm[2]);
}


function getcheckOutBook(Bookid){

  console.log('Trying to checkOutBook:'+Bookid);

  //var Bookid = [3,'yash','yash.sharma_cs21@gla.ac.in'];
  
  var ss = SpreadsheetApp.openById(SHEET);
  var dataSheet = ss.getSheetByName('data');
  var getLastRow = dataSheet.getLastRow();
  var databooks = dataSheet.getRange(2,1,getLastRow,20).getValues();
  var foundIndex;

  var response;

  for (var i = 0; i < (getLastRow-1); i++){
    if (Bookid[0] == databooks[i][1]){
      console.log('book found');
      response = 1;
      foundindex = i;

      if (databooks[i][6] == 'CheckOut'){
         console.log('Already checkout');  
         response = 2;
      }
      i = getLastRow;
    }else{
      console.log('Book not found');
      response = 3;
    }
  }
if (response == 1){
  
  dataSheet.getRange(foundindex+2,7,1,1).setValue('CheckOut');
  dataSheet.getRange(foundindex+2,8,1,1).setValue(Bookid[1]);
  dataSheet.getRange(foundindex+2,9,1,1).setValue(Bookid[2]);
  dataSheet.getRange(foundindex+2,9,1,1).setValue(Bookid[2]);
  dataSheet.getRange(foundindex+2,10,1,1).setValue(TodayDate);
  var dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // Due in 14 days
  dataSheet.getRange(foundindex+2,11,1,1).setValue(dueDate);

  var recipient = Bookid[2];
  var subject = 'Book Check out Notification! for BookId: ' + Bookid[0];
  var line1 = 'Hi '+Bookid[1];
  var line2 = 'You Checked out Book ID : '+ Bookid[0]+'.';
  var line3 = 'The due date for book is : '+dueDate+'.'; 
  var body = line1+'\n\n'+line2+'\n'+line3;
  sendEmail(recipient,subject,body);
}

return response;
}



function getcheckInBook(Bookid){
  //var Bookid = [3];

  console.log('Trying to checkinBook:'+Bookid);
  
  var ss = SpreadsheetApp.openById(SHEET);
  var dataSheet = ss.getSheetByName('data');
  var getLastRow = dataSheet.getLastRow();
  var databooks = dataSheet.getRange(2,1,getLastRow,20).getValues();
  var foundIndex;

  var response;

  for (var i = 0; i < (getLastRow-1); i++){
    if (Bookid[0] == databooks[i][1]){
      console.log('book found');
      response = 1;
      foundindex = i;

      if (databooks[i][6] != 'CheckOut'){
         console.log('Already checkout');  
         response = 2;
      }
      i = getLastRow;
    }else{
      console.log('Book not found');
      response = 3;
    }
  }
if (response == 1){
  dataSheet.getRange(foundindex+2,7,1,1).setValue('');
  dataSheet.getRange(foundindex+2,8,1,1).setValue('');
  dataSheet.getRange(foundindex+2,9,1,1).setValue('');
  dataSheet.getRange(foundindex+2,10,1,1).setValue('');
  dataSheet.getRange(foundindex+2,11,1,1).setValue('');

  var returnDate = new Date(); 
  console.log("foundindex"+foundindex);
  
  var recipient = databooks[foundindex][8];
  var subject = 'Book Check-in Notification! Book ID: ' + databooks[foundindex][1];
  var line1 = 'Hi '+ databooks[foundindex][7];
  var line2 = 'You Checked in Book ID:'+ databooks[foundindex][1];+'.';
  var line3 = 'The due date for book was : '+databooks[foundindex][10];
  var line4 = 'And the book is Returned on : '+returnDate+'.'; 
  var body = line1+'\n\n'+line2+'\n'+line3+'\n'+line4;
  if (returnDate > databooks[foundindex][10]){
    console.log("data[foundindex][10]"+databooks[foundindex][10]);
    var timeDifference = returnDate - databooks[foundindex][10];
    var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var line5 ='You were late by '+daysDifference+' days.';
    var line6 ='You will be fined rupees:  ₹'+5*daysDifference+'.'
    body = line1+'\n\n'+line2+'\n'+line3+'\n'+line4+'\n'+line5+'\n'+line6;
  }
  sendEmail(recipient,subject,body);
}

return response;
}

function sendEmail(recipient,subject,body) {
  console.log("sendEmail");
  console.log("recipient:"+recipient);
  console.log("subject"+subject);
  console.log("body"+body);

  var recipient = recipient;
  var subject = subject;
  var body = body;
  MailApp.sendEmail(recipient, subject, body);
}




















