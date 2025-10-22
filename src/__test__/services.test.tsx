import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";
import "@testing-library/jest-dom";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("Services Page", () => {
  it("renders the main heading", () => {
    render(<ServicesPage />);
    const heading = screen.getByRole("heading", {
      name: /our services/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the subheading text", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(
        /tailored solutions for billion-dollar industries in nigeria/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders exactly 5 service cards", () => {
    render(<ServicesPage />);
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(5);
  });

  it("renders all expected service titles", () => {
    render(<ServicesPage />);
    expect(screen.getByText(/web design & development/i)).toBeInTheDocument();
    expect(screen.getByText(/ui\/ux design/i)).toBeInTheDocument();
    expect(screen.getByText(/custom platforms/i)).toBeInTheDocument();
    expect(screen.getByText(/branding & strategy/i)).toBeInTheDocument();
    expect(screen.getByText(/maintenance & support/i)).toBeInTheDocument();
  });

  it("renders the CTA strip with booking text", () => {
    render(<ServicesPage />);
    expect(
      screen.getByText(/not sure what service fits\? book a free call/i),
    ).toBeInTheDocument();
  });

  it("renders the book call button", () => {
    render(<ServicesPage />);
    const button = screen.getByRole("button", {
      name: /book a free consultation call/i,
    });
    expect(button).toBeInTheDocument();
  });
});
