# Helm Textile Mills

![Helm Textile Mills](https://helmtex.co.za/_next/static/media/helm.45e72953.png)

A modern, responsive website for Helm Textile Mills, a leading South African textile manufacturer established in 1992, specializing in high-quality fabrics for various industries.

## About The Project

Helm Textile Mills website showcases the company's products, services, and expertise in textile manufacturing. The website serves as a comprehensive platform for customers to explore fabric collections, learn about specialized finishes, and connect with the company.

### Key Features

- **Products Showcase**: Browse through various fabric collections with detailed information
- **Specialized Finishes**: Learn about EasyClean®, Antibacterial, and Flame Retardant treatments
- **Online Gallery**: View fabric applications in different settings
- **Contact & Quote System**: Request quotes directly through the website
- **Blog Section**: Industry insights and company updates
- **Mobile Responsive Design**: Optimized for all devices

### Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Firebase](https://firebase.google.com/) - Backend services
- [Vercel](https://vercel.com/) - Hosting and deployment
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Lucide React](https://lucide.dev/) - Icon library
- [Embla Carousel](https://www.embla-carousel.com/) - Carousel component
- [Radix UI](https://www.radix-ui.com/) - UI primitives

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js 20 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/Ubaton/helmtex.git
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
helmtex/
├── app/                  # Next.js app directory
│   ├── (products)/       # Product-related pages
│   ├── about/            # About page
│   ├── blog/             # Blog pages
│   ├── collections/      # Collections page
│   ├── contacts/         # Contact page
│   ├── finishes/         # Finishes page
│   ├── gallery/          # Gallery page
│   └── ...               # Other pages
├── components/           # React components
│   ├── AboutUs/          # About page components
│   ├── ArticleCard/      # Blog article components
│   ├── Blogs/            # Blog components
│   ├── ContactUs/        # Contact page components
│   ├── Finishes/         # Fabric finishes components
│   ├── Gallery/          # Gallery components
│   ├── HomePage/         # Home page components
│   ├── Navbar/           # Navigation components
│   ├── ProductCard/      # Product display components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── lib/                  # Utility functions & libraries
├── public/               # Static files
│   ├── assets/           # Images and other assets
│   ├── blogs/            # Blog images
│   └── ...               # Other static files
└── utils/                # Helper functions
```

## CI/CD Pipelines

This project uses GitHub Actions for continuous integration and deployment.

### Automated Workflows

1. **Dependency Updates** - Automatically checks for outdated dependencies weekly and creates PRs with updates.

   - Runs every Sunday at midnight UTC
   - Can be manually triggered from GitHub Actions
   - Creates a PR with updated dependencies

2. **CI Pipeline** - Validates code quality and builds the project.

   - Runs on every push to main and on pull requests
   - Lints the code
   - Builds the project
   - Caches build output for faster subsequent runs

3. **CD Pipeline** - Deploys the application to production.
   - Runs on every push to main
   - Builds the project
   - Deploys to your hosting provider (configured for Vercel by default)
   - Supports alternative deployment methods (see comments in workflow file)

## Deployment

The site is deployed using Vercel for seamless integration with Next.js.

## Features Deep Dive

### Product Catalog

- Browse through different fabric collections
- View detailed product information
- Request quotes for specific products

### Specialized Fabric Finishes

- **EasyClean®**: Water and stain repellent treatment
- **Antibacterial**: Protects against bacteria and pathogens
- **Flame Retardant**: Meets fire safety standards

### Contact System

- Direct message submission
- Quote request system
- Location information and map

## Contributing

Contributions are welcome and greatly appreciated.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Proprietary. All rights reserved by Helm Textile Mills.

## Contact

Helm Textile Mills - [sales@helmtex.co.za](mailto:sales@helmtex.co.za)

Website: [https://www.helmtex.co.za](https://www.helmtex.co.za)
