# 🌱 AgriScan - AI-Powered Plant Disease Detection

AgriScan is a comprehensive plant disease detection platform that uses **n8n AI workflows** to provide accurate, real-time analysis of plant health. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### 🔬 **n8n AI-Powered Analysis**
- **n8n Workflow Integration**: Custom AI workflows for plant disease detection
- **Real-time Processing**: Live image analysis through n8n webhooks
- **Comprehensive Results**: Disease detection, treatment recommendations, and economic analysis
- **Scalable Architecture**: Easy to extend with additional AI services

### 📊 **Comprehensive Analysis**
- **Disease Detection**: Identify plant diseases with confidence scores
- **Technical Metrics**: Image quality, processing speed, model confidence
- **Pathogen Identification**: Species, strain, and resistance profiles
- **Environmental Analysis**: Weather impact and disease favorability
- **Economic Impact**: Cost-benefit analysis and ROI calculations
- **Treatment Recommendations**: Evidence-based treatment options
- **Expert Insights**: Professional recommendations and community feedback

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Analytics**: Live dashboard with performance metrics
- **Advanced Components**: Tabbed analysis views and interactive charts
- **Professional Interface**: Clean, modern design with smooth animations

## 🛠️ Setup Instructions

### 1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/agriscan.git
   cd agriscan
   ```

### 2. **Install Dependencies**
   ```bash
   npm install
   ```

### 3. **n8n Setup (Primary AI Processing)**

#### **Option A: n8n Cloud (Recommended)**
1. Sign up at [n8n.cloud](https://n8n.cloud/)
2. Create a new workspace
3. Import the workflow from `n8n-workflows/plant-disease-detection.json`
4. Activate the workflow
5. Copy the webhook URL

#### **Option B: Self-hosted n8n**
1. Install n8n globally:
   ```bash
   npm install n8n -g
   ```
2. Start n8n:
   ```bash
   n8n start
   ```
3. Access n8n at `http://localhost:5678`
4. Import the workflow from `n8n-workflows/plant-disease-detection.json`
5. Activate the workflow
6. Copy the webhook URL (typically `http://localhost:5678/webhook/agriscan-analyze`)

### 4. **Environment Configuration**

Copy the environment example file and configure your n8n settings:

   ```bash
   cp env.example .env
   ```

#### **Required n8n Configuration:**
```
N8N_WEBHOOK_URL=http://localhost:5678/webhook/agriscan-analyze
N8N_API_KEY=your_n8n_api_key
```

### 5. **Run the Next.js Application**

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Access the application at `http://localhost:3000`

3. Upload an image to test the integration with n8n

### 6. **How the Integration Works**

1. The Next.js application uploads images through the `/api/analyze` endpoint
2. The API route forwards the image to the n8n webhook
3. n8n processes the image using the plant disease detection workflow
4. Results are returned to the Next.js application and displayed to the user

#### **Optional: Alternative AI Services (Fallback)**
```
# Google Cloud Vision API
GOOGLE_CLOUD_KEY_FILE=path/to/your/google-cloud-key.json

# Plant.id API (Plant Disease Detection)
PLANT_ID_API_KEY=your_plant_id_api_key_here

# Azure Computer Vision API
AZURE_VISION_ENDPOINT=https://your-resource-name.cognitiveservices.azure.com/
AZURE_VISION_KEY=your_azure_vision_key_here

# OpenWeatherMap API (Weather Data)
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### 5. **Run the Development Server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 **n8n Workflow Integration**

### **How It Works**

The application uses n8n workflows for AI processing:

1. **Image Upload**: Users upload plant images through the web interface
2. **n8n Webhook**: Image is sent to n8n workflow via webhook
3. **AI Processing**: n8n workflow processes the image using AI nodes
4. **Results Return**: Comprehensive analysis results are returned to the app
5. **Display**: Results are displayed in the user interface

### **n8n Workflow Components**

| Node | Purpose | Function |
|------|---------|----------|
| **Webhook Trigger** | Entry point | Receives image data from AgriScan |
| **Data Extractor** | Data processing | Extracts and validates image data |
| **Validation** | Input validation | Ensures required data is present |
| **AI Analysis** | Disease detection | Analyzes image for plant diseases |
| **Results Generator** | Data formatting | Generates comprehensive analysis |
| **Webhook Response** | Output | Returns results to AgriScan |

### **Workflow Features**

- **Real AI Processing**: Custom AI logic for plant disease detection
- **Error Handling**: Graceful fallbacks for invalid data
- **Comprehensive Analysis**: Multiple analysis types in one workflow
- **Scalable**: Easy to add more AI services and analysis types

## 📱 **Usage**

### **Basic Analysis**
1. Upload a plant image (JPG, PNG, up to 10MB)
2. Click "Analyze Plant"
3. View basic disease detection results

### **Advanced Analysis**
1. After basic analysis, explore the tabbed interface:
   - **Basic Results**: Disease detection and confidence
   - **Advanced Analysis**: Technical metrics and AI insights
   - **Expert Insights**: Professional recommendations
   - **Analytics**: Performance metrics and trends

### **Camera Capture**
1. Click the camera tab
2. Allow camera access
3. Capture a photo of the plant
4. Analyze the captured image

## 🏗️ **Architecture**

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Component library
- **Lucide React**: Modern icons

### **Backend**
- **Next.js API Routes**: Server-side API endpoints
- **n8n Integration**: Primary AI processing via webhooks
- **Fallback Services**: Alternative AI services when n8n is unavailable
- **Real-time Processing**: Asynchronous AI analysis

### **Data Flow**
```
Frontend → API Route → n8n Webhook → AI Workflow → 
Results Processing → Frontend Display
```

## 🔒 **Security & Privacy**

- **No Image Storage**: Images are processed in memory and not stored
- **Secure Webhooks**: n8n webhook authentication
- **Input Validation**: File type and size validation
- **Error Handling**: Graceful fallbacks for workflow failures

## 🚀 **Deployment**

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **n8n Deployment**
- **n8n Cloud**: Managed service (recommended)
- **Self-hosted**: Docker, Kubernetes, or direct installation
- **Hybrid**: Local development with cloud production

## 📊 **Performance**

- **Fast Processing**: n8n workflow optimization
- **Responsive UI**: Optimized for all devices
- **Caching**: Efficient data handling
- **Error Recovery**: Graceful fallbacks

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- **Issues**: Report bugs and feature requests on GitHub
- **Documentation**: Check the code comments and n8n workflow documentation
- **Community**: Join our discussions for help and ideas

## 🔮 **Future Enhancements**

- **Advanced n8n Workflows**: More sophisticated AI processing
- **Database Integration**: Store analysis history
- **Mobile App**: Native iOS/Android applications
- **Batch Processing**: Multiple image analysis
- **Machine Learning**: Custom model training in n8n
- **IoT Integration**: Sensor data correlation
- **Expert Network**: Connect with agricultural experts

---

**Built with ❤️ for the agricultural community using n8n AI workflows**
