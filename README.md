# Life After People: An Interactive Timeline

<div align="center">
  <img width="1200" height="475" alt="Life After People Banner" src="./assets/hero-background.jpg" />
</div>

## 🌍 Overview

**Life After People** is an immersive, interactive web application that explores the fascinating question: *"What would happen to our planet if humanity suddenly vanished?"* 

Based on the acclaimed documentary series "Life After People," this application combines scientific research with cutting-edge AI technology to visualize how our world would transform over time. Users can upload images of familiar places and watch as AI generates stunning visualizations of nature's reclamation across different time periods.

## ✨ Features

### 🎯 Core Functionality
- **Interactive Timeline**: Navigate through four distinct time periods (First Year, First Century, Millennia, Deep Future)
- **AI-Powered Image Generation**: Upload any image and generate 6 different time-lapse views using Google's Gemini AI
- **Dynamic Decay Chart**: Real-time visualization showing structural integrity decay of different materials over time
- **Google Maps Integration**: Select locations directly from Street View for image generation
- **Video Script Generation**: AI-generated narration scripts for creating documentary-style videos

### 🌐 Multi-Language Support
- **English** (Primary)
- **中文** (Chinese Simplified)
- **日本語** (Japanese)

### 🎨 User Experience
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging transitions and scroll-based interactions
- **Download Functionality**: Export generated images and scripts as a complete package

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization library

### AI & Services
- **Google Gemini API** - Image generation and analysis
- **Google Maps API** - Street View integration
- **JSZip** - File compression for downloads

### Development Tools
- **Node.js** - Runtime environment
- **Vite** - Build tooling and HMR
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShaneHsu08/life-after-people.git
   cd life-after-people
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GOOGLE_MAPS_API_KEY=your_google_map_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📖 How to Use

### 1. Explore the Timeline
- Scroll through the interactive timeline to learn about different time periods
- Watch the decay chart update dynamically as you navigate
- Read detailed descriptions of what happens to our world at each stage

### 2. Generate AI Images
- **Upload an Image**: Click "Choose an Image" to upload a photo of any location
- **Use Google Maps**: Click "Choose from Google Map" to select a Street View location
- **Generate Future**: Click the generate button to create 6 time-lapse images:
  - 1 Year Later
  - 100 Years Later
  - 1,000 Years Later
  - 10,000 Years Later
  - 100,000 Years Later
  - 1 Million Years Later

### 3. Create Content
- **Video Script**: AI generates a documentary-style narration script
- **Download Package**: Export all images and script as a ZIP file
- **Share Results**: Use generated content for educational or creative projects

## 🏗️ Project Structure

```
life-after-people/
├── components/           # React components
│   ├── DecayChart.tsx   # Interactive decay visualization
│   ├── Hero.tsx         # Landing section
│   ├── ImageGenerator.tsx # AI image generation interface
│   ├── Timeline.tsx     # Timeline navigation and content
│   ├── MapModal.tsx     # Google Maps integration
│   └── ...
├── services/            # API services
│   └── geminiService.ts # Google Gemini integration
├── constants.ts         # Translation data
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── vite.config.ts      # Vite configuration
```

## 🔧 Configuration

### Environment Variables
- `GEMINI_API_KEY`: Required for AI image generation and analysis
- `GOOGLE_MAPS_API_KEY`: Required for select street view picture via Google Map

### Customization
- **Themes**: Modify color schemes in Tailwind CSS classes
- **Translations**: Update language content in `constants.ts`
- **Timeline Data**: Modify timeline events in the translation files
- **Chart Data**: Adjust decay rates in `DecayChart.tsx`

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow TypeScript best practices
2. Use meaningful component and variable names
3. Add comments for complex logic
4. Test across different browsers and devices
5. Ensure responsive design works on all screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **"Life After People"** documentary series for inspiration and scientific foundation
- **Google Gemini** for providing powerful AI image generation capabilities
- **Recharts** for beautiful data visualization components
- **Vite** team for the excellent development experience

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/ShaneHsu08/life-after-people/issues) page
2. Create a new issue with detailed information
3. Include browser version and error messages

---

**© 2025, ShenYouX. An Exploration of a World Without Us. Inspired by "Life After People".**