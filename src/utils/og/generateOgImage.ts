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
        backgroundColor: '#0A0F1A',
        backgroundImage: 'linear-gradient(rgba(10, 15, 26, 0.95), rgba(5, 9, 18, 0.9))',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Biomechanical grid background
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                linear-gradient(90deg, rgba(88, 188, 242, 0.05) 1px, transparent 1px),
                linear-gradient(rgba(88, 188, 242, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              zIndex: 1,
              display: 'none'
            },
          },
        },
        // Central oral implant interface
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -40%)',
              width: '320px',
              height: '240px',
              zIndex: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            children: [
              // Open mouth structure
              {
                type: 'div',
                props: {
                  style: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: `
                      radial-gradient(circle at 50% 30%, 
                        rgba(200, 200, 200, 0.08) 0%,
                        transparent 60%
                      )`,
                    borderRadius: '40% 40% 50% 50%',
                    display: 'none'
                  }
                }
              },
              // Implant device
              {
                type: 'div',
                props: {
                  style: {
                    position: 'absolute',
                    top: '38%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '180px',
                    height: '80px',
                    background: `
                      linear-gradient(
                        145deg,
                        #2C3A4B 0%,
                        #3A4B5C 30%,
                        #4C5D6E 100%
                      )`,
                    borderRadius: '30px 30px 60px 60px',
                    border: '2px solid rgba(136, 192, 208, 0.18)',
                    boxShadow: '0 0 30px rgba(58, 143, 183, 0.13)',
                    display: 'flex',
                    zIndex: 4
                  },
                  children: [
                    // Interface elements
                    {
                      type: 'div',
                      props: {
                        style: {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `
                            linear-gradient(90deg, 
                              rgba(136, 192, 208, 0.13) 1px, 
                              transparent 1px
                            )`,
                          backgroundSize: '14px 14px',
                          display: 'none'
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        // Floating particles container
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              zIndex: 2
            },
            children: Array.from({ length: 8 }).map((_, i) => ({
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  top: `${10 + Math.random() * 80}%`,
                  left: `${10 + Math.random() * 80}%`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  backgroundColor: ['#58BCF2', '#B0BEC5', '#ECEFF1'][i % 3],
                  borderRadius: '50%',
                  opacity: 0.3 + Math.random() * 0.5,
                  boxShadow: `0 0 8px ${['#58BCF2', '#B0BEC5', '#ECEFF1'][i % 3]}`,
                  zIndex: 2
                }
              }
            }))
          }
        },
        // Author info
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
              zIndex: 5
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '24px',
                    color: '#ECEFF1',
                    opacity: 0.85,
                    fontWeight: 700
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
              zIndex: 5,
              position: 'relative',
            },
            children: [
              // Title
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: '72px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #ECEFF1 10%, #90A4AE 60%, #78909C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: 0,
                    lineHeight: 1.2
                  },
                  children: title,
                },
              },
              // Date and tags
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
                          color: '#B0BEC5',
                          opacity: 0.85
                        },
                        children: formattedDate,
                      },
                    },
                    ...(tagsString ? [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '24px',
                            color: '#B0BEC5',
                            opacity: 0.85,
                          },
                          children: '•',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '24px',
                            color: '#90A4AE',
                            opacity: 0.85
                          },
                          children: tagsString,
                        },
                      }
                    ] : [])
                  ]
                },
              },
            ],
          },
        },
        // Website URL
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '60px',
              right: '60px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ECEFF1',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 5
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
      ].filter(Boolean),
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
