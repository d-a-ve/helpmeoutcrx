chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // listens for the redirect action from content_script
  if(request.action === "redirect") {
    console.log("Redirecting...");
    const handleRedirect = async () => {
      await chrome.tabs.create({
        url: request.payload.url,
      })
      return {
        success: true,
        message: "successfully redirected",
      }
    }
    const message = await handleRedirect();
    sendResponse(message);
  }
});

export {};
