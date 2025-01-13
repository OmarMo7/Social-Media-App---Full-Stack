import React from 'react'

const GoogleButton = () => {
  return (
    <div>
      <div id="g_id_onload"
        data-client_id="627073650855-1845cbhj0t4f65opj6rbimjcjr8e0fg1.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3000/auth"
        data-auto_prompt="false">
      </div>

      <div className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
      </div>
    </div>

  )
}

export default GoogleButton