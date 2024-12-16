import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FC } from 'react';

export const Presentation: FC = () => {
  return (
    <main className="flex flex-col items-center px-6 py-12 sm:px-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-yellow-400 mb-4">
          Welcome to Top-One
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Top-One is the ultimate solution for managing users, products, and
          orders. Whether you&apos;re an admin, seller, or client, our platform
          is designed to make your life easier.
        </p>
      </header>

      <section className="mt-12 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black dark:text-white">
          Why Choose Top-One?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
            <CardHeader>
              <CardTitle>Total Control</CardTitle>
              <CardDescription>For Admins</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Administrators can efficiently manage users, products, and
                discounts while ensuring smooth operations across the platform.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>For Sellers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Sellers can create, track, and update orders with ease, ensuring
                seamless communication with their clients.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
            <CardHeader>
              <CardTitle>Client Experience</CardTitle>
              <CardDescription>For Clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Clients benefit from real-time order tracking, personalized
                notifications, and a smooth shopping journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black dark:text-white">
          Core Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
            <CardHeader>
              <CardTitle>Responsive Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Navigate easily with a dynamic, responsive sidebar tailored to
                your role in the platform.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Clients receive automatic email updates whenever the status of
                their orders changes.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
            <CardHeader>
              <CardTitle>Secure Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Sellers can securely manage orders, while admins oversee all
                critical operations.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
            <CardHeader>
              <CardTitle>Mobile-Friendly Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Enjoy a sleek, modern interface built with Tailwind CSS that
                works flawlessly on any device.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};
