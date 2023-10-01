const handleRedirect = async (payload:any) => {
  await chrome.tabs.create({
    url: payload.url
  })

  return {
    success: true,
    action: "Redirected",
  }
}

export default handleRedirect