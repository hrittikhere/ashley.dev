import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { CollectionEntry } from 'astro:content';

// Default dimensions for OG images
const WIDTH = 1200;
const HEIGHT = 630;

// We'll use a more reliable way to load fonts
async function loadGoogleFont(font: string, weights = [400, 700]) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${font}:wght@${weights.join(';')}&display=swap`,
    {
      headers: {
        // Make sure it returns TTF files
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    }
  ).then((response) => response.text());

  // Extract font URLs
  const fontUrls = css
    .match(/src: url\((.+?)\)/g)
    ?.map((src) => {
      const url = src.match(/src: url\((.+?)\)/)?.[1];
      return url;
    })
    .filter((url): url is string => url !== undefined); // Filter out undefined values

  if (!fontUrls || fontUrls.length === 0) return null;

  // Fetch each font file
  const fontDataArr = await Promise.all(
    fontUrls.map((url) => fetch(url).then((res) => res.arrayBuffer()))
  );

  return fontDataArr.map((fontData) => Buffer.from(fontData));
}

// Create directory if it doesn't exist
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};


export async function generateOgImage(post: CollectionEntry<'posts'>) {
  const slug = post.slug;
  const title = post.data.title;
  const authorName = 'Hrittik Roy';
  
  // Format the date
  const formattedDate = new Date(post.data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get tags as a string if they exist
  const tagsString = post.data.tags ? post.data.tags.slice(0, 3).join(', ') : '';
  
  const outputPath = path.resolve(`./public/og-images/${slug}.png`);
  const publicPath = `/og-images/${slug}.png`;

  // Check if the image already exists
  if (fs.existsSync(outputPath)) {
    return publicPath;
  }

  // Ensure the directory exists
  ensureDirectoryExists(path.dirname(outputPath));

  try {
    // Load fonts from Google Fonts
    const fontData = await loadGoogleFont('Inter');
    
    if (!fontData || fontData.length === 0) {
      throw new Error('Failed to load font data');
    }

const svg = await satori(
  {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#050a20',
        backgroundImage: 'linear-gradient(rgba(8, 16, 45, 0.9), rgba(5, 10, 32, 0.95))',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Circuit board patterns
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundImage: 'linear-gradient(90deg, rgba(15, 245, 170, 0.03) 1px, transparent 1px), linear-gradient(rgba(15, 245, 170, 0.03) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              zIndex: 1, // Fixed: removed px unit
            },
          },
        },
        // Holographic interface glow
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '600px',
              height: '400px',
              transform: 'translate(-50%, -60%)',
              background: 'radial-gradient(ellipse at center, rgba(15, 245, 170, 0.15) 0%, rgba(41, 112, 255, 0.1) 40%, transparent 70%)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              filter: 'blur(30px)',
              zIndex: 2, // Fixed: removed px unit
            },
          },
        },
        // Neural network node 1
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '20%',
              left: '30%',
              width: '8px',
              height: '8px',
              backgroundColor: '#0FF5AA',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(15, 245, 170, 0.8)',
              zIndex: 3, // Fixed: removed px unit
            },
          },
        },
        // Neural network node 2
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '35%',
              left: '45%',
              width: '6px',
              height: '6px',
              backgroundColor: '#3D68FF',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(61, 104, 255, 0.8)',
              zIndex: 3, // Fixed: removed px unit
            },
          },
        },
        // Neural network node 3
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '50%',
              left: '20%',
              width: '7px',
              height: '7px',
              backgroundColor: '#0FF5AA',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(15, 245, 170, 0.8)',
              zIndex: 3, // Fixed: removed px unit
            },
          },
        },
        // Neural network node 4
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '40%',
              left: '70%',
              width: '5px',
              height: '5px',
              backgroundColor: '#3D68FF',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(61, 104, 255, 0.8)',
              zIndex: 3, // Fixed: removed px unit
            },
          },
        },
        // Digital code fragment 1
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '25%',
              right: '15%',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: 'rgba(15, 245, 170, 0.6)',
              transform: 'rotate(-15deg)',
              zIndex: 3, // Fixed: removed px unit
              opacity: 0.6,
              textShadow: '0 0 8px currentColor',
            },
            children: 'Animesh',
          },
        },
        // Digital code fragment 2
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '60%',
              right: '25%',
              fontFamily: 'monospace',
              fontSize: '16px',
              color: 'rgba(61, 104, 255, 0.6)',
              transform: 'rotate(20deg)',
              zIndex: 3, // Fixed: removed px unit
              opacity: 0.5,
              textShadow: '0 0 8px currentColor',
            },
            children: 'Kubernetes',
          },
        },
        // Digital code fragment 3
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '40%',
              right: '35%',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(255, 86, 177, 0.5)',
              transform: 'rotate(-5deg)',
              zIndex: 3, // Fixed: removed px unit
              opacity: 0.4,
              textShadow: '0 0 8px currentColor',
            },
            children: '=> {}',
          },
        },
        // Central tech device/component
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '200px',
              height: '200px',
              transform: 'translate(-50%, -70%) rotate(45deg)',
              background: 'linear-gradient(135deg, rgba(15, 245, 170, 0.1) 0%, rgba(41, 112, 255, 0.15) 100%)',
              border: '2px solid rgba(15, 245, 170, 0.3)',
              borderRadius: '30px',
              boxShadow: '0 0 40px rgba(15, 245, 170, 0.2), inset 0 0 20px rgba(41, 112, 255, 0.15)',
              zIndex: 4, // Fixed: removed px unit
              overflow: 'hidden',
              display: 'flex', // Added explicit display flex
            },
            children: [
              // Internal circuit pattern
              {
                type: 'div',
                props: {
                  style: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                  },
                },
              },
            ],
          },
        },
        // Floating particle 1
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '15%',
              left: '25%',
              width: '2px',
              height: '2px',
              backgroundColor: '#0FF5AA',
              borderRadius: '50%',
              opacity: 0.6,
              boxShadow: '0 0 5px #0FF5AA',
              zIndex: 3, // Fixed: removed px unit
            },
          },
        },
        // Floating particle 2
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '75%',
              left: '65%',
              width: '3px',
              height: '3px',
              backgroundColor: '#3D68FF',
              borderRadius: '50%',
              opacity: 0.5,
              boxShadow: '0 0 5px #3D68FF',
              zIndex: 3, // Fixed: removed px unit
            },
          },
        },
        // Floating particle 3
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '35%',
              left: '85%',
              width: '1.5px',
              height: '1.5px',
              backgroundColor: '#FF56B1',
              borderRadius: '50%',
              opacity: 0.7,
              boxShadow: '0 0 5px #FF56B1',
              zIndex: 3, // Fixed: removed px unit
            },
          },
        },
        // Author info at top
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '60px',
              left: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              zIndex: 5, // Fixed: removed px unit
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '24px',
                    color: '#FFFFFF',
                    opacity: 0.9,
                  },
                  children: authorName,
                },
              },
            ],
          },
        },
        // Main content area
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 5, // Fixed: removed px unit
              position: 'relative',
            },
            children: [
              // Title with enhanced neon glow effect
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: '72px',
                    fontWeight: 'bold',
                    color: '#0FF5AA',
                    margin: '0',
                    lineHeight: 1.2,
                    textShadow: '0 0 5px rgba(15, 245, 170, 0.8), 0 0 15px rgba(15, 245, 170, 0.5), 0 0 30px rgba(15, 245, 170, 0.3), 0 0 40px rgba(15, 245, 170, 0.2)',
                  },
                  children: title,
                },
              },
              // Date and tags with enhanced subtle glow
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '20px',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '24px',
                          color: '#FFFFFF',
                          opacity: 0.9,
                          textShadow: '0 0 3px rgba(255, 255, 255, 0.5)',
                        },
                        children: formattedDate,
                      },
                    },
                    tagsString ? {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '24px',
                          color: '#FFFFFF',
                          opacity: 0.9,
                        },
                        children: '•',
                      },
                    } : null,
                    tagsString ? {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '24px',
                          color: '#FF56B1',
                          opacity: 0.9,
                          textShadow: '0 0 5px rgba(255, 86, 177, 0.5), 0 0 15px rgba(255, 86, 177, 0.3)',
                        },
                        children: tagsString,
                      },
                    } : null,
                  ].filter(Boolean),
                },
              },
            ],
          },
        },
        // Website URL with enhanced neon effect
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '60px',
              right: '60px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              opacity: 0.9,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 5, // Fixed: removed px unit
              textShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)',
            },
            children: [
              {
                type: 'span',
                props: {
                  children: 'hrittikhere.me',
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: 'Inter',
        data: fontData[0],
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: fontData[1] || fontData[0],
        weight: 700,
        style: 'normal',
      },
    ],
  }
);



    // Convert SVG to PNG
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: WIDTH,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Write the PNG file
    fs.writeFileSync(outputPath, pngBuffer);

    return publicPath;
  } catch (error) {
    console.error('Error generating OG image:', error);
    // Return default image path if generation fails
    return '/meta.png';
  }
}
