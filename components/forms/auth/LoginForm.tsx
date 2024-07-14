"use client";

import { Button, Form, PasswordInput, Stack, TextInput } from "@carbon/react";

export const LoginForm = () => {
  return (
    <Form className="px-4">
      <Stack gap={7}>
        <h2 className="text-bold ">Welcome back</h2>
        <p>Please enter your details</p>
        <TextInput
          id="phone-number-input"
          type="tel"
          labelText="Phone Number"
          placeholder="+000 000 000 000"
        />
        <PasswordInput
          id="password-input"
          labelText="Password"
          placeholder="Enter password"
        />
        <Button className="bg-[#0f62fe]">Login</Button>
      </Stack>
    </Form>
  );
};
