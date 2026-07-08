# 🍰 L'Artisan Patisserie

A premium, modern, and fully interactive web application for a luxury bakery and patisserie. Built with **Next.js**, **Prisma ORM**, **TailwindCSS**, and **Framer Motion**.


##  Features

- **Premium UI/UX**: Custom design system featuring elegant typography (`Great Vibes` and `Outfit`), smooth scroll, and a custom cursor.
- **Dynamic Menu**: Fully database-driven menu with category filtering and interactive add-to-cart functionality.
- **Interactive Cart & Checkout**: A complete checkout flow allowing customers to place orders.
- **Order Tracking**: Customers can track their order status in real-time using their Order ID.
- **Real-Time Notifications**: Integrated Nodemailer and Twilio to automatically send email and SMS updates to customers.
- **Custom Cake Bookings**: A dedicated form for users to book consultations for weddings and special occasions.
- **Admin Dashboard**: A hidden, secure admin portal (`/admin`) to manage orders, update statuses, and view reservations.
- **Social & Contact Integrations**: Features a floating WhatsApp widget, an infinite scrolling Instagram feed marquee, and an interactive Google Maps embed.
- **Rich Animations**: Scroll-triggered animations and fluid page transitions powered by `framer-motion`.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: SQLite (Local)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Email & SMS**: [Nodemailer](https://nodemailer.com/) & [Twilio](https://www.twilio.com/)

##  Getting Started

First, clone the repository and install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Database Setup

This project uses Prisma with a local SQLite database. 

1. Push the schema to your database:
```bash
npx prisma db push
```

2. Seed the database with the initial menu items:
```bash
npx prisma db seed
```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##  Admin Portal

You can access the admin dashboard by navigating to `http://localhost:3000/admin`.
From here, you can view all recent orders, change their statuses (PENDING -> PREPARING -> COMPLETED), and view incoming custom cake reservations!

