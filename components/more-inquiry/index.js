import React from "react";
import "./styles.scss";
import { Button, Form, Heading, Stack, TextInput } from "@carbon/react";
import {
  LogoFacebook,
  LogoInstagram,
  LogoTwitter,
  SpellCheck,
} from "@carbon/icons-react";
import Link from "next/link";
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
            <Button
              type="submit"
              size="sm"
              renderIcon={SpellCheck}
              className="subscribe"
            >
              Subscribe
            </Button>
          </Stack>
        </Form>
      </div>
      <div className="med-social-links">
        <Link href="https://twitter.com">
          <LogoTwitter
          target="_blank"
            className="logo-med"
            style={{ color: "#008AD8" }}
            size={64}
          />
        </Link>
        <Link target="_blank" href="https://instagram.com">
          <LogoInstagram
            className="logo-med"
            style={{ color: "#d62976" }}
            size={64}
          />
        </Link>
        <Link target="_blank" href="https://facebook.com">
          <LogoFacebook
            className="logo-med"
            style={{ color: "#1877f2" }}
            size={64}
          />
        </Link>
      </div>

      <div className="copyright">copyright © 2024. Powered by Watson - IBM</div>
    </div>
  );
}

export default MoreEnquiry;
