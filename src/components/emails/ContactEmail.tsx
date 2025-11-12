// emails/ContactEmail.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";
import * as React from "react";

type Props = { name: string; email: string; message: string };

export default function ContactEmail({ name, email, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New contact message</Preview>
      <Body
        style={{
          backgroundColor: "#f9fafb",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <Container
          style={{ backgroundColor: "#ffffff", padding: 20, borderRadius: 8 }}
        >
          <Heading style={{ fontSize: 20 }}>New message from NextScale</Heading>
          <Text>
            <strong>Name:</strong> {name}
          </Text>
          <Text>
            <strong>Email:</strong> {email}
          </Text>
          <Text style={{ marginTop: 12 }}>
            <strong>Message:</strong>
          </Text>
          <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
