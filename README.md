# Notification Delivery Server(news-subscriber)

## Project Overview:

This project is a **Notification Delivery Server** that allows authorized users to subscribe to receive timely updates on specific topics or regions. The system offers a customizable notification service where users can register their interests and receive notifications through multiple delivery methods. It is designed to scale with support for more regions and a broader range of topics in future versions.

## Key Features:

- **User Registration & Authorization**: Only authorized users can register and subscribe to specific news topics or regions of interest.
  
- **Flexible Notification Formats**:
  - **Callback URL**: Users can define a default callback URL where the system will send HTTP requests when a notification relevant to their interests is triggered.
  - **Centrifugo Integration**: Alternatively, notifications can be sent in real-time using the Centrifugo service for instantaneous updates.

## Future Enhancements:
- Expansion to support additional topics and regions.
- Improved flexibility in the notification formats.