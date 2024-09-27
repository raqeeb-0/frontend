import styles  from './styles/Features.module.css';
import { FeaturesHeader } from './FeaturesHeader';
import { Wave1 } from './Waves';
import { Card } from './Card';


const features = [
  {
    header: 'inventory management',
    imageSrc: '/features/inventory.png',
    paragraph: 'Seamlessly manage your inventory with live updates on stock levels, sales, and alerts for low stock. Utilize advanced forecasting to predict future inventory needs and reduce overstock and stockouts.'
  },
  {
    header: 'product tracking',
    imageSrc: '/features/product.png',
    paragraph: 'Monitor your products from entry to exit, ensuring complete visibility and control over your inventory lifecycle. Track product movements, shelf life, and location within the warehouse, improving accuracy and efficiency.'
  },
  {
    header: 'order management',
    imageSrc: '/features/order.png',
    paragraph: 'Efficiently manage orders, track shipments, handle returns, and keep customers informed at every step. Automate order processing and fulfillment to reduce errors and speed up delivery times.'
  },
  {
    header: 'supplier management',
    imageSrc: '/features/supplier.png',
    paragraph: 'Keep track of supplier details, orders, and performance metrics to maintain strong and reliable supplier relationships. Automate purchase orders, manage supplier contracts, and evaluate supplier performance with detailed analytics.'
  },
  {
    header: 'customer management',
    imageSrc: '/features/customer.png',
    paragraph: 'Manage customer information, track orders, and analyze purchasing behaviors to enhance customer satisfaction. Provide personalized service, automate marketing campaigns, and manage customer support requests efficiently.'
  },
  {
    header: 'reporting & analytics',
    imageSrc: '/features/analytics.png',
    paragraph: 'Unlock powerful insights with advanced reporting tools. Track key metrics, identify trends, and make informed decisions with customizable dashboards and comprehensive reports.'
  }
];

export const Features = () => {
  return (
    <section>
      <FeaturesHeader />
      <div id='features'>
        <Wave1 turnOver={true} />
      </div>
      <main className={styles.main}>
        {
          features.map((feature, index) => {
            return (
              <Card
                key={index}
                index={index + 1}
                {...feature}
              />
            );
          })
        }
      </main>
      <Wave1 />
    </section>
  );
}
