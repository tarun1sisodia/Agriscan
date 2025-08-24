# AgriScan - AI-Powered Agricultural Disease Detection Platform

![AgriScan Logo](https://img.shields.io/badge/AgriScan-AI%20Powered%20Agriculture-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC)

AgriScan is an intelligent agricultural platform that helps farmers identify plant diseases, bacteria, fungi, and other crop health issues through image analysis. The platform provides real-time diagnosis and treatment recommendations to optimize crop health and yield.

## 🌟 Features

- **🖼️ Image-based Disease Detection**: Upload plant images for instant analysis
- **🔬 Multi-pathogen Identification**: Detects bacteria, fungi, viruses, and nutrient deficiencies
- **💊 Treatment Recommendations**: Suggests appropriate medicines and treatments
- **📊 Crop Health Monitoring**: Track plant health over time
- **🎨 User-friendly Dashboard**: Intuitive interface for farmers of all technical levels
- **⚡ Real-time Analysis**: Fast processing with progress indicators
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **AI Workflow**: n8n automation platform
- **Image Processing**: Google Vision API (configurable)
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- n8n account or local installation
- Google Vision API key (optional for demo)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/agriscan.git
   cd agriscan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
agriscan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts          # Image analysis API endpoint
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main application page
│   ├── components/
│   │   └── ui/                       # shadcn/ui components
│   └── lib/
│       └── utils.ts                  # Utility functions
├── n8n-workflows/
│   └── image-analysis-workflow.json  # n8n workflow configuration
├── public/                           # Static assets
├── env.example                       # Environment variables template
└── README.md                         # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# n8n Configuration
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/agriscan-analyze
N8N_API_KEY=your_n8n_api_key

# Google Vision API (for image analysis)
GOOGLE_VISION_API_KEY=your_google_vision_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### n8n Workflow Setup

1. **Import the workflow**
   - Open your n8n instance
   - Import the workflow from `n8n-workflows/image-analysis-workflow.json`

2. **Configure credentials**
   - Set up Google Vision API credentials in n8n
   - Configure the webhook URL

3. **Activate the workflow**
   - Enable the workflow in n8n
   - Copy the webhook URL to your environment variables

## 🎯 Usage

### For Farmers

1. **Upload Image**: Click "Choose File" and select a clear image of your plant
2. **Analyze**: Click "Analyze Plant" to start the AI analysis
3. **Review Results**: View detected diseases, confidence levels, and severity
4. **Get Recommendations**: Follow the treatment and prevention suggestions

### For Developers

The platform is built with extensibility in mind:

- **Add new AI services**: Modify the API route to integrate different vision APIs
- **Custom workflows**: Extend the n8n workflow for additional processing
- **Database integration**: Add persistence for analysis history
- **User authentication**: Implement user accounts and history tracking

## 🔌 API Endpoints

### POST `/api/analyze`

Analyzes uploaded plant images for disease detection.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with `image` field containing the image file

**Response:**
```json
{
  "success": true,
  "data": {
    "analysis": {
      "disease": "Leaf Blight",
      "confidence": 85,
      "severity": "Moderate",
      "treatments": ["Apply fungicide", "Remove infected leaves"],
      "prevention": ["Avoid overhead watering", "Maintain spacing"]
    }
  }
}
```

## 🎨 Customization

### Styling

The application uses Tailwind CSS with shadcn/ui components. You can customize:

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Components**: Customize shadcn/ui components in `src/components/ui/`
- **Layout**: Adjust the main layout in `src/app/layout.tsx`

### Adding New Features

1. **New Analysis Types**: Extend the n8n workflow with additional AI services
2. **User Dashboard**: Add authentication and user-specific features
3. **History Tracking**: Implement database storage for analysis history
4. **Export Reports**: Add PDF generation for analysis reports

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** with automatic builds

### Other Platforms

The application is compatible with:
- **Netlify**: Similar to Vercel deployment
- **Railway**: For full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

## 🗺️ Roadmap

- [ ] **User Authentication**: User accounts and history
- [ ] **Database Integration**: Persistent storage for analysis results
- [ ] **Advanced AI Models**: Integration with specialized agricultural AI
- [ ] **Mobile App**: React Native mobile application
- [ ] **Multi-language Support**: Internationalization for global farmers
- [ ] **Offline Mode**: Basic analysis without internet connection
- [ ] **Community Features**: Farmer community and knowledge sharing

## 🙏 Acknowledgments

- **n8n**: For the powerful automation platform
- **Google Vision API**: For image analysis capabilities
- **shadcn/ui**: For the beautiful component library
- **Tailwind CSS**: For the utility-first CSS framework
- **Next.js**: For the React framework

---

**Built with ❤️ for farmers worldwide**

*Empowering agriculture through AI technology*
