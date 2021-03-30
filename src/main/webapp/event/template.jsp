<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>

<head>
  <meta charset="utf-8">

  <!-- Set Subject Here -->
  <title> <s:property value="subject"/> </title>

  <style>
    .ExternalClass {
      width: 100%;
    }
    /* Forces Outlook.com to display emails at full width */
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }
    /* Forces Outlook.com to display normal line spacing, here is more on that: http://www.emailonacid.com/forum/viewthread/43/ */
    .imageFix {
      display: block;
    }
    a {
      text-decoration: none;
    }
    @media screen and (max-width: 600px) {
      table.row th.col-lg-1,
      table.row th.col-lg-2,
      table.row th.col-lg-3,
      table.row th.col-lg-4,
      table.row th.col-lg-5,
      table.row th.col-lg-6,
      table.row th.col-lg-7,
      table.row th.col-lg-8,
      table.row th.col-lg-9,
      table.row th.col-lg-10,
      table.row th.col-lg-11,
      table.row th.col-lg-12 {
        display: block;
        width: 100% !important;
      }
      .d-mobile {
        display: block !important;
      }
      .d-desktop {
        display: none !important;
      }
    }
    @media yahoo {
      .d-mobile {
        display: none !important;
      }
      .d-desktop {
        display: block !important;
      }
    }
  </style>
</head>

<body style="-moz-box-sizing: border-box; -ms-text-size-adjust: 100%; -webkit-box-sizing: border-box; -webkit-text-size-adjust: 100%; Margin: 0; border: 0; box-sizing: border-box; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; height: 100%; line-height: 24px; margin: 0; min-width: 100%; outline: 0; padding: 0; width: 100%;">
  <div class="bg-light" style="background-color: #f8f9fa;">
    <table class="container" style="border-collapse: collapse; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td align="center" style="border-collapse: collapse; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0; padding: 0px 16px 0 16px;">
            <table align="center" style="border-collapse: collapse; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; max-width: 600px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td style="border-collapse: collapse; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0;">
                    <div class="mb-4" style="margin-bottom: 10px; border-bottom: 8px solid #8EC850;">
                      <table class="card mb-4" style="border: 1px solid #dee2e6; border-collapse: separate !important; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; overflow: hidden; border-bottom: 0px;" border="0"
                        cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="100%">
                        <tbody>
                          <tr>
                            <td style="border-collapse: collapse; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0;" width="100%">
                              
                              <table align="center" style="border-collapse: collapse; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td align="center" style="border-collapse: collapse; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0;">
                                          <div class="mt-4 mb-3">
                                            <img class="align-center mt-4 mb-3" width="100%" height="100%" src="https://gallery.mailchimp.com/c327d84e2f06782c3864b7020/images/1ad92cc4-7a1b-4bd2-aee3-c39b25192bda.png" style="border: 0 none; height: auto; line-height: 100%; outline: none; text-decoration: none;">
                                          </div>
                                        </td>
                                    </tr>
                                </tbody>
			                        </table>
			                    
                              <div style="background: white;">
                                <table class="card-body" style="border-collapse: collapse; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                    <tr>
                                      <td style="border-collapse: collapse; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0; padding: 20px; padding-top: 0px;" width="100%">
                                        <div>
                                          <!-- Status -->
                                          <h5 class="text-center" style="color: red; font-size: 16px; font-weight: 500; line-height: 22px; margin-bottom: 8px; margin-top: 0; text-align: left; vertical-align: baseline; padding-top: 12px;"><strong> <s:property value="status"/> </strong></h5>
                                          <table width="100%" class="table" style="border-collapse: collapse; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; max-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
                                            <tbody align="left">
                                              <tr>
                                                <td width="45%" style="font-size: 20px; line-height: 24px; margin: 0;" align="left"><strong style="color: #3C6C95; font-size: 16px;"><s:property value="startDay"/></strong> <br> <strong style="color: #3C6C95; font-size: 16px;"><s:property value="startDate"/></strong><br> <strong><s:property value="startTime"/><br></strong></td>
                                                <td width="10%" style="font-size: 20px; line-height: 24px; margin: 0;" align="center">&#8594;</td>
                                                <td width="45%"  style="font-size: 20px; line-height: 24px; margin: 0;" align="right"><strong style="color: #3C6C95; font-size: 16px;"><s:property value="endDay"/></strong> <br> <strong style="color: #3C6C95; font-size: 16px;"><s:property value="endDate"/></strong><br> <strong><s:property value="endTime"/></strong></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table class="table" style="border-collapse: collapse; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; max-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
                                            width="100%">
                                            <tbody>
                                              <tr>
                                                <td style="border-collapse: collapse; border-spacing: 0px; border-top: 0; font-size: 24px; font-weight: 500; line-height: 26.4px; margin: 0; padding-top: 20px; color: #3C6C95;" valign="top"> <s:property escapeHtml="false" value="body"/> </td>
                                              </tr>
                                              <tr>
                                                <td style="border-collapse: collapse; border-spacing: 0px; border-top: 0; font-size: 16px; line-height: 24px; margin: 0; padding-top: 20px;" valign="top">Location - <strong> <s:property value="location"/> </strong></td>
                                              </tr>
                                              <s:if test="requester neq '' and requesterEmail neq ''">
                                                <tr>
                                                  <td style="border-collapse: collapse; border-spacing: 0px; border-top: 0; font-size: 16px; line-height: 24px; margin: 0; padding-top: 20px;" valign="top">Requester - <strong> <s:property value="requester"/> : <s:property value="requesterEmail"/> </strong></td>
                                                </tr>
                                              </s:if>
                                              <tr>
                                                <td style="border-collapse: collapse; border-spacing: 0px; border-top: 0; font-size: 16px; line-height: 24px; margin: 0; padding-top: 20px;" valign="top"> <s:property escapeHtml="false" value="extra"/> </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="border-collapse: collapse; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0;" width="100%">
                              <div>
                                <table class="card-body" style="border-collapse: collapse; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                    <tr>
                                      <td style="border-collapse: collapse; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0; padding: 20px;" width="100%">
                                        <div>
                                          <table align="center" style="margin-top: 4px; border-collapse: collapse; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" border="0" cellpadding="0" cellspacing="0">
                                            <tbody>
                                              <tr>
                                                <td align="center" style="border-collapse: collapse; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0;">
                                                  <table class="btn btn-primary btn-lg align-center mt-2" align="left" style="border-collapse: separate !important; border-radius: 4px; border-spacing: 0px; font-family: Helvetica, Arial, sans-serif; margin: 0px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                    cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                      <tr>
                                                        <td style="border-collapse: collapse; border-radius: 4px; border-spacing: 0px; font-size: 16px; line-height: 24px; margin: 0;" bgcolor="#ffffff">
                                                          <a href="<s:property value='eventURL'/>" style="background-color: #ffffff; border: 1.5px solid #3C6C95; border-color: #3C6C95; border-radius: 4.8px; color: #3C6C95; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; line-height: 30px; padding: 8px 16px; text-align: center; text-decoration: none; white-space: nowrap;">View In EZMaxMobile</a>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

  </div>

</body>

</html>