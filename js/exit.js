const sanitize = require("mongo-sanitize");
const Participant = require("./participant.js");
const nodemailer = require("nodemailer");

function exit(req, res) {
  const id = sanitize(req.body.id);
  const blindspots = sanitize(req.body.blindspots);
  const stopping_distance = sanitize(req.body.stopping_distance);
  const texting_risk = sanitize(req.body.texting_risk);
  const score = sanitize(req.body.score);

  if (
    id !== undefined &&
    blindspots !== undefined &&
    stopping_distance !== undefined &&
    texting_risk !== undefined
  ) {
    Participant.findOne({ id: id }, function(err, participant) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error finding the participant" });
      } else {
        if (participant) {
          participant.active = false;
          participant.blindspots = blindspots;
          participant.stopping_distance = stopping_distance;
          participant.texting_risk = texting_risk;
          participant.save().then(() => {
            res.status(200).json({ participant });
            ////
            email(score, participant.email, participant.name);
            
          });
        } else {
          res.status(300).json({ message: "The participant was not found" });
        }
      }
    });
  } else {
    res.status(300).json({ message: "Please include all fields" });
  }
}



async function email(score, email, name) {
  let transporter = nodemailer.createTransport({
    //host: "smtp.gmail.com",
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      //user: "safet360vr@gmail.com", // generated ethereal user
      //pass: "ATA360TrucksVR19" // generated ethereal password
      user: "safet360@truck.net.au",
      pass: "Noz09274"
    }
  });

  let message = {
    //from: "safet360vr@gmail.com",
    from: "safet360@truck.net.au",
    // Comma separated list of recipients
    to: email,

    // Subject of the message
    subject: "Thanks for participating in SafeT360!",

    // HTML body
    html:
      '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>SafeT360</title> <style type="text/css"> p{ margin:10px 0; padding:0; } table{ border-collapse:collapse; } h1,h2,h3,h4,h5,h6{ display:block; margin:0; padding:0; } img,a img{ border:0; height:auto; outline:none; text-decoration:none; } body,#bodyTable,#bodyCell{ height:100%; margin:0; padding:0; width:100%; } .mcnPreviewText{ display:none !important; } #outlook a{ padding:0; } img{ -ms-interpolation-mode:bicubic; } table{ mso-table-lspace:0pt; mso-table-rspace:0pt; } .ReadMsgBody{ width:100%; } .ExternalClass{ width:100%; } p,a,li,td,blockquote{ mso-line-height-rule:exactly; } a[href^=tel],a[href^=sms]{ color:inherit; cursor:default; text-decoration:none; } p,a,li,td,body,table,blockquote{ -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; } .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{ line-height:100%; } a[x-apple-data-detectors]{ color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; } #bodyCell{ padding:10px; } .templateContainer{ max-width:600px !important; } a.mcnButton{ display:block; } .mcnImage,.mcnRetinaImage{ vertical-align:bottom; } .mcnTextContent{ word-break:break-word; } .mcnTextContent img{ height:auto !important; } .mcnDividerBlock{ table-layout:fixed !important; } /* @tab Page @section Background Style @tip Set the background color and top border for your email. You may want to choose colors that match your company\'s branding. */ body,#bodyTable{ /*@editable*/background-color:#010101; } /* @tab Page @section Background Style @tip Set the background color and top border for your email. You may want to choose colors that match your company\'s branding. */ #bodyCell{ /*@editable*/border-top:0; } /* @tab Page @section Email Border @tip Set the border for your email. */ .templateContainer{ /*@editable*/border:0; } /* @tab Page @section Heading 1 @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings. @style heading 1 */ h1{ /*@editable*/color:#202020; /*@editable*/font-family:Helvetica; /*@editable*/font-size:26px; /*@editable*/font-style:normal; /*@editable*/font-weight:bold; /*@editable*/line-height:125%; /*@editable*/letter-spacing:normal; /*@editable*/text-align:left; } /* @tab Page @section Heading 2 @tip Set the styling for all second-level headings in your emails. @style heading 2 */ h2{ /*@editable*/color:#202020; /*@editable*/font-family:Helvetica; /*@editable*/font-size:22px; /*@editable*/font-style:normal; /*@editable*/font-weight:bold; /*@editable*/line-height:125%; /*@editable*/letter-spacing:normal; /*@editable*/text-align:left; } /* @tab Page @section Heading 3 @tip Set the styling for all third-level headings in your emails. @style heading 3 */ h3{ /*@editable*/color:#202020; /*@editable*/font-family:Helvetica; /*@editable*/font-size:20px; /*@editable*/font-style:normal; /*@editable*/font-weight:bold; /*@editable*/line-height:125%; /*@editable*/letter-spacing:normal; /*@editable*/text-align:left; } /* @tab Page @section Heading 4 @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings. @style heading 4 */ h4{ /*@editable*/color:#202020; /*@editable*/font-family:Helvetica; /*@editable*/font-size:18px; /*@editable*/font-style:normal; /*@editable*/font-weight:bold; /*@editable*/line-height:125%; /*@editable*/letter-spacing:normal; /*@editable*/text-align:left; } /* @tab Preheader @section Preheader Style @tip Set the background color and borders for your email\'s preheader area. */ #templatePreheader{ /*@editable*/background-color:#000000; /*@editable*/background-image:none; /*@editable*/background-repeat:no-repeat; /*@editable*/background-position:center; /*@editable*/background-size:cover; /*@editable*/border-top:0; /*@editable*/border-bottom:0; /*@editable*/padding-top:9px; /*@editable*/padding-bottom:9px; } /* @tab Preheader @section Preheader Text @tip Set the styling for your email\'s preheader text. Choose a size and color that is easy to read. */ #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{ /*@editable*/color:#656565; /*@editable*/font-family:Helvetica; /*@editable*/font-size:12px; /*@editable*/line-height:150%; /*@editable*/text-align:left; } /* @tab Preheader @section Preheader Link @tip Set the styling for your email\'s preheader links. Choose a color that helps them stand out from your text. */ #templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{ /*@editable*/color:#656565; /*@editable*/font-weight:normal; /*@editable*/text-decoration:underline; } /* @tab Header @section Header Style @tip Set the background color and borders for your email\'s header area. */ #templateHeader{ /*@editable*/background-color:#000000; /*@editable*/background-image:none; /*@editable*/background-repeat:no-repeat; /*@editable*/background-position:center; /*@editable*/background-size:cover; /*@editable*/border-top:0; /*@editable*/border-bottom:0; /*@editable*/padding-top:9px; /*@editable*/padding-bottom:0; } /* @tab Header @section Header Text @tip Set the styling for your email\'s header text. Choose a size and color that is easy to read. */ #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{ /*@editable*/color:#202020; /*@editable*/font-family:Helvetica; /*@editable*/font-size:16px; /*@editable*/line-height:150%; /*@editable*/text-align:left; } /* @tab Header @section Header Link @tip Set the styling for your email\'s header links. Choose a color that helps them stand out from your text. */ #templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{ /*@editable*/color:#007C89; /*@editable*/font-weight:normal; /*@editable*/text-decoration:underline; } /* @tab Body @section Body Style @tip Set the background color and borders for your email\'s body area. */ #templateBody{ /*@editable*/background-color:#000000; /*@editable*/background-image:none; /*@editable*/background-repeat:no-repeat; /*@editable*/background-position:center; /*@editable*/background-size:cover; /*@editable*/border-top:0; /*@editable*/border-bottom:2px solid #ffffff; /*@editable*/padding-top:0; /*@editable*/padding-bottom:9px; } /* @tab Body @section Body Text @tip Set the styling for your email\'s body text. Choose a size and color that is easy to read. */ #templateBody .mcnTextContent,#templateBody .mcnTextContent p{ /*@editable*/color:#202020; /*@editable*/font-family:Helvetica; /*@editable*/font-size:16px; /*@editable*/line-height:150%; /*@editable*/text-align:left; } /* @tab Body @section Body Link @tip Set the styling for your email\'s body links. Choose a color that helps them stand out from your text. */ #templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{ /*@editable*/color:#007C89; /*@editable*/font-weight:normal; /*@editable*/text-decoration:underline; } /* @tab Footer @section Footer Style @tip Set the background color and borders for your email\'s footer area. */ #templateFooter{ /*@editable*/background-color:#000000; /*@editable*/background-image:none; /*@editable*/background-repeat:no-repeat; /*@editable*/background-position:center; /*@editable*/background-size:cover; /*@editable*/border-top:0; /*@editable*/border-bottom:0; /*@editable*/padding-top:9px; /*@editable*/padding-bottom:9px; } /* @tab Footer @section Footer Text @tip Set the styling for your email\'s footer text. Choose a size and color that is easy to read. */ #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{ /*@editable*/color:#656565; /*@editable*/font-family:Helvetica; /*@editable*/font-size:12px; /*@editable*/line-height:150%; /*@editable*/text-align:center; } /* @tab Footer @section Footer Link @tip Set the styling for your email\'s footer links. Choose a color that helps them stand out from your text. */ #templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{ /*@editable*/color:#656565; /*@editable*/font-weight:normal; /*@editable*/text-decoration:underline; } @media only screen and (min-width:768px){ .templateContainer{ width:600px !important; } } @media only screen and (max-width: 480px){ body,table,td,p,a,li,blockquote{ -webkit-text-size-adjust:none !important; } } @media only screen and (max-width: 480px){ body{ width:100% !important; min-width:100% !important; } } @media only screen and (max-width: 480px){ #bodyCell{ padding-top:10px !important; } } @media only screen and (max-width: 480px){ .mcnRetinaImage{ max-width:100% !important; } } @media only screen and (max-width: 480px){ .mcnImage{ width:100% !important; } } @media only screen and (max-width: 480px){ .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{ max-width:100% !important; width:100% !important; } } @media only screen and (max-width: 480px){ .mcnBoxedTextContentContainer{ min-width:100% !important; } } @media only screen and (max-width: 480px){ .mcnImageGroupContent{ padding:9px !important; } } @media only screen and (max-width: 480px){ .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{ padding-top:9px !important; } } @media only screen and (max-width: 480px){ .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{ padding-top:18px !important; } } @media only screen and (max-width: 480px){ .mcnImageCardBottomImageContent{ padding-bottom:9px !important; } } @media only screen and (max-width: 480px){ .mcnImageGroupBlockInner{ padding-top:0 !important; padding-bottom:0 !important; } } @media only screen and (max-width: 480px){ .mcnImageGroupBlockOuter{ padding-top:9px !important; padding-bottom:9px !important; } } @media only screen and (max-width: 480px){ .mcnTextContent,.mcnBoxedTextContentColumn{ padding-right:18px !important; padding-left:18px !important; } } @media only screen and (max-width: 480px){ .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{ padding-right:18px !important; padding-bottom:0 !important; padding-left:18px !important; } } @media only screen and (max-width: 480px){ .mcpreview-image-uploader{ display:none !important; width:100% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Heading 1 @tip Make the first-level headings larger in size for better readability on small screens. */ h1{ /*@editable*/font-size:22px !important; /*@editable*/line-height:125% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Heading 2 @tip Make the second-level headings larger in size for better readability on small screens. */ h2{ /*@editable*/font-size:20px !important; /*@editable*/line-height:125% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Heading 3 @tip Make the third-level headings larger in size for better readability on small screens. */ h3{ /*@editable*/font-size:18px !important; /*@editable*/line-height:125% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Heading 4 @tip Make the fourth-level headings larger in size for better readability on small screens. */ h4{ /*@editable*/font-size:16px !important; /*@editable*/line-height:150% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Boxed Text @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px. */ .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{ /*@editable*/font-size:14px !important; /*@editable*/line-height:150% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Preheader Visibility @tip Set the visibility of the email\'s preheader on small screens. You can hide it to save space. */ #templatePreheader{ /*@editable*/display:block !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Preheader Text @tip Make the preheader text larger in size for better readability on small screens. */ #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{ /*@editable*/font-size:14px !important; /*@editable*/line-height:150% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Header Text @tip Make the header text larger in size for better readability on small screens. */ #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{ /*@editable*/font-size:16px !important; /*@editable*/line-height:150% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Body Text @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px. */ #templateBody .mcnTextContent,#templateBody .mcnTextContent p{ /*@editable*/font-size:16px !important; /*@editable*/line-height:150% !important; } } @media only screen and (max-width: 480px){ /* @tab Mobile Styles @section Footer Text @tip Make the footer content text larger in size for better readability on small screens. */ #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{ /*@editable*/font-size:14px !important; /*@editable*/line-height:150% !important; } }</style></head> <body> <span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span> <center> <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"> <tr> <td align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer"> <tr> <td valign="top" id="templatePreheader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;"> <tbody class="mcnTextBlockOuter"> <tr> <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;"> <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer"> <tbody><tr> <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #FFFFFF;text-align: center;"> <a href="*|ARCHIVE|*" target="_blank">View this email in your browser</a> </td> </tr> </tbody></table> </td> </tr> </tbody> </table></td> </tr> <tr> <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;"> <tbody class="mcnImageBlockOuter"> <tr> <td valign="top" style="padding:0px" class="mcnImageBlockInner"> <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;"> <tbody><tr> <td class="mcnImageContent" valign="top" style="padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;"> <img align="center" alt="" src="https://gallery.mailchimp.com/e76a8412b01d4d26b7cb0c77f/_compresseds/607a1c0b-6adf-4af4-a7de-a0610864193c.jpg" width="600" style="max-width:3333px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage"> </td> </tr> </tbody></table> </td> </tr> </tbody> </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;"> <tbody class="mcnTextBlockOuter"> <tr> <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;"> <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer"> <tbody><tr> <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;"> <p style="text-align: center;"><br> <br> <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif"><span style="font-size:14px"><span style="color:#FFFFFF">Hi '+name+',</span><br> <br> <span style="color:#FFFFFF">Thanks for visiting SafeT360 and for taking the quick ‘test’ on the way out – you scored '+ score +' out of 3.<br> <br> Now you know how to stay safe around trucks. Our goal is to save lives and prevent injury on and around our roads. You can help us achieve this by asking your family and friends to take the SafeT360 challenge online.</span></span></span><br>  </p> </td> </tr> </tbody></table> </td> </tr> </tbody> </table></td> </tr> <tr> <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;"> <tbody class="mcnButtonBlockOuter"> <tr> <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner"> <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 0px;background-color: #00FF1E;"> <tbody> <tr> <td align="center" valign="middle" class="mcnButtonContent" style="font-family: helvetica neue, Helvetica, Arial, Verdana, sans-serif; font-size: 13px; padding: 18px;"> <a class="mcnButton " title="Launch SafeT360" href="http://www.safet360.com.au" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #000000;">Launch SafeT360</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;"> <tbody class="mcnFollowBlockOuter"> <tr> <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;"> <tbody><tr> <td align="center" style="padding-left:9px;padding-right:9px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent"> <tbody><tr> <td align="center" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px;"> <table align="center" border="0" cellpadding="0" cellspacing="0"> <tbody><tr> <td align="center" valign="top"> <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnFollowStacked" style="display:inline;"> <tbody><tr> <td align="center" valign="top" class="mcnFollowIconContent" style="padding-right:10px; padding-bottom:9px;"> <a href="http://www.facebook.com/SafeT360" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/dark-facebook-96.png" alt="Facebook" class="mcnFollowBlockIcon" width="48" style="width:48px; max-width:48px; display:block;"></a> </td> </tr> </tbody></table> <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnFollowStacked" style="display:inline;"> <tbody><tr> <td align="center" valign="top" class="mcnFollowIconContent" style="padding-right:10px; padding-bottom:9px;"> <a href="http://instagram.com/safet360truck" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/dark-instagram-96.png" alt="Instagram" class="mcnFollowBlockIcon" width="48" style="width:48px; max-width:48px; display:block;"></a> </td> </tr> </tbody></table> <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnFollowStacked" style="display:inline;"> <tbody><tr> <td align="center" valign="top" class="mcnFollowIconContent" style="padding-right:0; padding-bottom:9px;"> <a href="http://www.twitter.com/SafeT360 " target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/dark-twitter-96.png" alt="Twitter" class="mcnFollowBlockIcon" width="48" style="width:48px; max-width:48px; display:block;"></a> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody> </table></td> </tr> <tr> <td valign="top" id="templateFooter"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;"> <tbody class="mcnTextBlockOuter"> <tr> <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;"> <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer"> <tbody><tr> <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;"> <div style="text-align: center;"><br> <em>Copyright © 2019 AUSTRALIAN TRUCKING ASSOCIATION, All rights reserved.</em><br></div> </td> </tr> </tbody></table> </td> </tr> </tbody> </table></td> </tr> </table> </td> </tr> </table> </center> </body> </html>'
  };
  let info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log(
    "Preview URL: %s",
    nodemailer.getTestMessageUrl(info)
  );
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  ////
}

email(3, "finn3walker@gmail.com", "Finn");

module.exports = exit;
