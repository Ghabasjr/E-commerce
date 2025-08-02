import { Restaurant, MenuCategory, MenuItem } from '../types';

// Mock restaurant data
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Italian Corner',
    description: 'Authentic Italian cuisine with fresh ingredients',
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400',
    rating: 4.5,
    reviewCount: 125,
    cuisine: ['Italian', 'Pizza', 'Pasta'],
    address: {
      id: '1',
      street: '456 Restaurant Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA',
      coordinates: {
        latitude: 40.7160,
        longitude: -74.0020,
      },
    },
    phone: '+1234567892',
    email: 'info@italiancorner.com',
    ownerId: '2',
    isOpen: true,
    openingHours: {
      monday: { open: '11:00', close: '22:00', isOpen: true },
      tuesday: { open: '11:00', close: '22:00', isOpen: true },
      wednesday: { open: '11:00', close: '22:00', isOpen: true },
      thursday: { open: '11:00', close: '22:00', isOpen: true },
      friday: { open: '11:00', close: '23:00', isOpen: true },
      saturday: { open: '11:00', close: '23:00', isOpen: true },
      sunday: { open: '12:00', close: '21:00', isOpen: true },
    },
    deliveryFee: 2.99,
    minimumOrder: 15,
    estimatedDeliveryTime: 30,
  },
  {
    id: '2',
    name: 'Burger Palace',
    description: 'Gourmet burgers and crispy fries',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    rating: 4.2,
    reviewCount: 89,
    cuisine: ['American', 'Burgers', 'Fast Food'],
    address: {
      id: '2',
      street: '789 Food Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      country: 'USA',
      coordinates: {
        latitude: 40.7200,
        longitude: -73.9900,
      },
    },
    phone: '+1234567893',
    email: 'contact@burgerpalace.com',
    ownerId: '3',
    isOpen: true,
    openingHours: {
      monday: { open: '10:00', close: '23:00', isOpen: true },
      tuesday: { open: '10:00', close: '23:00', isOpen: true },
      wednesday: { open: '10:00', close: '23:00', isOpen: true },
      thursday: { open: '10:00', close: '23:00', isOpen: true },
      friday: { open: '10:00', close: '24:00', isOpen: true },
      saturday: { open: '10:00', close: '24:00', isOpen: true },
      sunday: { open: '11:00', close: '22:00', isOpen: true },
    },
    deliveryFee: 1.99,
    minimumOrder: 12,
    estimatedDeliveryTime: 25,
  },
  {
    id: '3',
    name: 'Sushi Express',
    description: 'Fresh sushi and Japanese cuisine',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    rating: 4.7,
    reviewCount: 203,
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    address: {
      id: '3',
      street: '321 Sushi Lane',
      city: 'New York',
      state: 'NY',
      zipCode: '10004',
      country: 'USA',
      coordinates: {
        latitude: 40.7100,
        longitude: -74.0100,
      },
    },
    phone: '+1234567894',
    email: 'orders@sushiexpress.com',
    ownerId: '4',
    isOpen: true,
    openingHours: {
      monday: { open: '12:00', close: '22:00', isOpen: true },
      tuesday: { open: '12:00', close: '22:00', isOpen: true },
      wednesday: { open: '12:00', close: '22:00', isOpen: true },
      thursday: { open: '12:00', close: '22:00', isOpen: true },
      friday: { open: '12:00', close: '23:00', isOpen: true },
      saturday: { open: '12:00', close: '23:00', isOpen: true },
      sunday: { open: '13:00', close: '21:00', isOpen: true },
    },
    deliveryFee: 3.99,
    minimumOrder: 20,
    estimatedDeliveryTime: 35,
  },
];

// Mock menu data
const mockMenus: { [restaurantId: string]: MenuCategory[] } = {
  '1': [
    {
      id: 'appetizers_1',
      name: 'Appetizers',
      description: 'Start your meal with our delicious appetizers',
      items: [
        {
          id: 'item_1',
          restaurantId: '1',
          name: 'Bruschetta',
          description: 'Toasted bread with fresh tomatoes, basil, and garlic',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300',
          category: 'Appetizers',
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          isSpicy: false,
          allergens: ['gluten'],
          isAvailable: true,
          preparationTime: 10,
        },
        {
          id: 'item_2',
          restaurantId: '1',
          name: 'Mozzarella Sticks',
          description: 'Crispy breaded mozzarella with marinara sauce',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=300',
          category: 'Appetizers',
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          isSpicy: false,
          allergens: ['gluten', 'dairy'],
          isAvailable: true,
          preparationTime: 8,
        },
      ],
    },
    {
      id: 'pizza_1',
      name: 'Pizza',
      description: 'Wood-fired pizzas with fresh toppings',
      items: [
        {
          id: 'item_3',
          restaurantId: '1',
          name: 'Margherita Pizza',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300',
          category: 'Pizza',
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          isSpicy: false,
          allergens: ['gluten', 'dairy'],
          isAvailable: true,
          preparationTime: 15,
        },
        {
          id: 'item_4',
          restaurantId: '1',
          name: 'Pepperoni Pizza',
          description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
          price: 18.99,
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
          category: 'Pizza',
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          isSpicy: false,
          allergens: ['gluten', 'dairy'],
          isAvailable: true,
          preparationTime: 15,
        },
      ],
    },
  ],
  '2': [
    {
      id: 'burgers_2',
      name: 'Burgers',
      description: 'Juicy gourmet burgers made with premium beef',
      items: [
        {
          id: 'item_5',
          restaurantId: '2',
          name: 'Classic Burger',
          description: 'Beef patty with lettuce, tomato, onion, and our special sauce',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
          category: 'Burgers',
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          isSpicy: false,
          allergens: ['gluten', 'dairy'],
          isAvailable: true,
          preparationTime: 12,
        },
        {
          id: 'item_6',
          restaurantId: '2',
          name: 'Bacon Cheeseburger',
          description: 'Beef patty with bacon, cheese, lettuce, and tomato',
          price: 15.99,
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300',
          category: 'Burgers',
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          isSpicy: false,
          allergens: ['gluten', 'dairy'],
          isAvailable: true,
          preparationTime: 12,
        },
      ],
    },
  ],
  '3': [
    {
      id: 'sushi_3',
      name: 'Sushi Rolls',
      description: 'Fresh sushi rolls made with premium ingredients',
      items: [
        {
          id: 'item_7',
          restaurantId: '3',
          name: 'California Roll',
          description: 'Crab, avocado, and cucumber',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300',
          category: 'Sushi Rolls',
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isSpicy: false,
          allergens: ['shellfish'],
          isAvailable: true,
          preparationTime: 8,
        },
        {
          id: 'item_8',
          restaurantId: '3',
          name: 'Spicy Tuna Roll',
          description: 'Spicy tuna with cucumber and avocado',
          price: 10.99,
          image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300',
          category: 'Sushi Rolls',
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isSpicy: true,
          allergens: ['fish'],
          isAvailable: true,
          preparationTime: 8,
        },
      ],
    },
  ],
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getRestaurants = async (filters?: {
  location?: string;
  cuisine?: string;
  search?: string;
}): Promise<Restaurant[]> => {
  await delay(800);
  
  let filteredRestaurants = [...mockRestaurants];
  
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredRestaurants = filteredRestaurants.filter(
      restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.description.toLowerCase().includes(searchTerm) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm))
    );
  }
  
  if (filters?.cuisine) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.cuisine.includes(filters.cuisine!)
    );
  }
  
  return filteredRestaurants;
};

export const getRestaurantById = async (restaurantId: string): Promise<Restaurant> => {
  await delay(500);
  
  const restaurant = mockRestaurants.find(r => r.id === restaurantId);
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }
  
  return restaurant;
};

export const getRestaurantMenu = async (restaurantId: string): Promise<MenuCategory[]> => {
  await delay(600);
  
  const menu = mockMenus[restaurantId];
  if (!menu) {
    throw new Error('Menu not found');
  }
  
  return menu;
};

export const searchRestaurants = async (query: string): Promise<Restaurant[]> => {
  await delay(700);
  
  const searchTerm = query.toLowerCase();
  return mockRestaurants.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm) ||
      restaurant.description.toLowerCase().includes(searchTerm) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm))
  );
};

export const getNearbyRestaurants = async (
  latitude: number,
  longitude: number,
  radius: number = 10
): Promise<Restaurant[]> => {
  await delay(900);
  
  // Simple distance calculation (in a real app, this would be more sophisticated)
  return mockRestaurants.filter(restaurant => {
    const restaurantLat = restaurant.address.coordinates?.latitude || 0;
    const restaurantLng = restaurant.address.coordinates?.longitude || 0;
    
    const distance = Math.sqrt(
      Math.pow(latitude - restaurantLat, 2) + Math.pow(longitude - restaurantLng, 2)
    );
    
    return distance <= radius;
  });
};

export const getPopularRestaurants = async (): Promise<Restaurant[]> => {
  await delay(500);
  
  return mockRestaurants
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 10);
};