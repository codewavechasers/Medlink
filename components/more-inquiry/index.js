import React from "react";
import "./styles.scss";
import { Button, Form, Heading, Stack, TextInput } from "@carbon/react";
import { LogoFacebook, LogoInstagram, LogoTwitter, SpellCheck } from "@carbon/icons-react";
function MoreEnquiry() {
  return (
    <div className="more-inquiry">
      <div className="more-left">
        <Form aria-label="News letter form" className="subscribe-form">
          <Stack gap={7}>
            <TextInput
              id="text-input-1"
              type="text"
              labelText="Email Address"
              helperText="Fill to recieve news letters from Medlink on a weekly Basis."
            />
            <Button type="submit" size="sm" renderIcon={SpellCheck} className="subscribe">
              Subscribe
            </Button>
          </Stack>
        </Form>
      </div>
      <div className="med-social-links">
        <LogoTwitter className="logo-med" href="https://twitter.com" size={64}/>
        <LogoInstagram href="https://instagram.com" className="logo-med" size={64}/>
        <LogoFacebook href="https://facebook.com" className="logo-med" size={64}/>
      </div>

      <div className="copyright">copyright © 2024. Powered by Watson - IBM</div>
    </div>
  );
}

export default MoreEnquiry;
