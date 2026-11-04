"use client";

import { useEffect, useRef, useState } from "react";

const OUTER_PATH_D =
  "M123.00 10.89L122.84 11.00L122.00 11.40L121.00 11.79L120.75 12.00L120.00 12.49L119.37 13.00L119.00 13.34L118.28 14.00L118.00 14.29L117.38 15.00L117.00 15.46L116.57 16.00L116.00 16.74L115.76 17.00L115.11 18.00L115.00 18.12L114.36 19.00L114.00 19.44L113.55 20.00L113.00 20.73L112.76 21.00L112.11 22.00L112.00 22.11L111.36 23.00L111.00 23.43L110.54 24.00L110.00 24.70L109.74 25.00L109.07 26.00L109.00 26.07L108.34 27.00L108.00 27.40L107.53 28.00L107.00 28.69L106.73 29.00L106.08 30.00L106.00 30.08L105.34 31.00L105.00 31.41L104.53 32.00L104.00 32.68L103.72 33.00L103.05 34.00L103.00 34.05L102.32 35.00L102.00 35.38L101.52 36.00L101.00 36.67L100.72 37.00L100.03 38.00L100.00 38.03L99.31 39.00L99.00 39.36L98.50 40.00L98.00 40.64L97.69 41.00L97.00 41.99L96.99 42.00L96.30 43.00L96.00 43.36L95.50 44.00L95.00 44.64L94.70 45.00L94.01 46.00L94.00 46.01L93.29 47.00L93.00 47.34L92.49 48.00L92.00 48.62L91.68 49.00L91.00 49.97L90.97 50.00L90.28 51.00L90.00 51.33L89.48 52.00L89.00 52.62L88.68 53.00L88.00 53.94L87.94 54.00L87.26 55.00L87.00 55.29L86.46 56.00L86.00 56.59L85.66 57.00L85.00 57.92L84.92 58.00L84.27 59.00L84.00 59.31L83.47 60.00L83.00 60.60L82.66 61.00L82.00 61.90L81.90 62.00L81.24 63.00L81.00 63.27L80.45 64.00L80.00 64.57L79.64 65.00L79.00 65.89L78.89 66.00L78.24 67.00L78.00 67.27L77.45 68.00L77.00 68.56L76.64 69.00L76.00 69.85L75.86 70.00L75.22 71.00L75.00 71.24L74.43 72.00L74.00 72.54L73.62 73.00L73.00 73.86L72.87 74.00L72.23 75.00L72.00 75.25L71.43 76.00L71.00 76.54L70.62 77.00L70.00 77.82L69.83 78.00L69.19 79.00L69.00 79.21L68.41 80.00L68.00 80.51L67.60 81.00L67.00 81.81L66.83 82.00L66.19 83.00L66.00 83.21L65.41 84.00L65.00 84.50L64.58 85.00L64.00 85.79L63.81 86.00L63.17 87.00L63.00 87.19L62.40 88.00L62.00 88.49L61.59 89.00L61.00 89.80L60.81 90.00L60.17 91.00L60.00 91.19L59.40 92.00L59.00 92.48L58.57 93.00L58.00 93.76L57.78 94.00L57.13 95.00L57.00 95.14L56.38 96.00L56.00 96.46L55.57 97.00L55.00 97.75L54.78 98.00L54.13 99.00L54.00 99.14L53.37 100.00L53.00 100.44L52.55 101.00L52.00 101.73L51.76 102.00L51.12 103.00L51.00 103.13L50.36 104.00L50.00 104.44L49.56 105.00L49.00 105.73L48.76 106.00L48.10 107.00L48.00 107.11L47.34 108.00L47.00 108.41L46.53 109.00L46.00 109.70L45.74 110.00L45.07 111.00L45.00 111.07L44.34 112.00L44.00 112.41L43.53 113.00L43.00 113.70L42.74 114.00L42.07 115.00L42.00 115.07L41.33 116.00L41.00 116.39L40.52 117.00L40.00 117.68L39.72 118.00L39.04 119.00L39.00 119.04L38.32 120.00L38.00 120.38L37.52 121.00L37.00 121.67L36.72 122.00L36.00 123.00L36.00 123.00L35.30 124.00L35.00 124.35L34.49 125.00L34.00 125.64L33.69 126.00L33.00 127.00L33.00 127.00L32.30 128.00L32.00 128.36L31.50 129.00L31.00 129.64L30.70 130.00L30.00 130.97L29.97 131.00L29.28 132.00L29.00 132.33L28.49 133.00L28.00 133.62L27.68 134.00L27.00 134.96L26.96 135.00L26.28 136.00L26.00 136.33L25.48 137.00L25.00 137.61L24.67 138.00L24.00 138.92L23.92 139.00L23.26 140.00L23.00 140.30L22.46 141.00L22.00 141.59L21.66 142.00L21.00 142.92L20.92 143.00L20.26 144.00L20.00 144.30L19.47 145.00L19.00 145.58L18.64 146.00L18.00 146.89L17.90 147.00L17.24 148.00L17.00 148.27L16.45 149.00L16.00 149.57L15.64 150.00L15.00 150.89L14.89 151.00L14.24 152.00L14.00 152.27L13.44 153.00L13.00 153.54L12.62 154.00L12.00 154.85L11.86 155.00L11.22 156.00L11.00 156.24L10.44 157.00L10.00 157.52L9.59 158.00L9.29 159.00L10.00 159.39L11.00 159.32L12.00 159.34L13.00 159.34L14.00 159.34L15.00 159.34L16.00 159.34L17.00 159.34L18.00 159.34L19.00 159.34L20.00 159.34L21.00 159.34L22.00 159.34L23.00 159.34L24.00 159.34L25.00 159.34L26.00 159.34L27.00 159.34L28.00 159.34L29.00 159.34L30.00 159.34L31.00 159.34L32.00 159.34L33.00 159.34L34.00 159.34L35.00 159.34L36.00 159.34L37.00 159.34L38.00 159.34L39.00 159.34L40.00 159.34L41.00 159.34L42.00 159.28L43.00 159.06L43.12 159.00L44.00 158.70L45.00 158.47L46.00 158.03L46.03 158.00L47.00 157.49L47.69 157.00L48.00 156.74L48.98 156.00L49.00 155.98L49.97 155.00L50.00 154.97L50.75 154.00L51.00 153.72L51.55 153.00L52.00 152.43L52.36 152.00L53.00 151.13L53.12 151.00L53.78 150.00L54.00 149.76L54.57 149.00L55.00 148.46L55.38 148.00L56.00 147.15L56.14 147.00L56.79 146.00L57.00 145.77L57.57 145.00L58.00 144.47L58.38 144.00L59.00 143.18L59.17 143.00L59.81 142.00L60.00 141.79L60.58 141.00L61.00 140.48L61.39 140.00L62.00 139.17L62.16 139.00L62.80 138.00L63.00 137.78L63.58 137.00L64.00 136.49L64.40 136.00L65.00 135.20L65.19 135.00L65.83 134.00L66.00 133.82L66.60 133.00L67.00 132.51L67.41 132.00L68.00 131.22L68.20 131.00L68.84 130.00L69.00 129.83L69.61 129.00L70.00 128.52L70.43 128.00L71.00 127.24L71.22 127.00L71.85 126.00L72.00 125.84L72.62 125.00L73.00 124.53L73.43 124.00L74.00 123.23L74.21 123.00L74.86 122.00L75.00 121.85L75.63 121.00L76.00 120.56L76.45 120.00L77.00 119.27L77.24 119.00L77.90 118.00L78.00 117.89L78.64 117.00L79.00 116.57L79.45 116.00L80.00 115.28L80.25 115.00L80.89 114.00L81.00 113.89L81.65 113.00L82.00 112.58L82.46 112.00L83.00 111.29L83.26 111.00L83.92 110.00L84.00 109.92L84.66 109.00L85.00 108.59L85.46 108.00L86.00 107.30L86.26 107.00L86.93 106.00L87.00 105.93L87.68 105.00L88.00 104.62L88.48 104.00L89.00 103.33L89.29 103.00L89.97 102.00L90.00 101.97L90.68 101.00L91.00 100.62L91.48 100.00L92.00 99.33L92.29 99.00L92.97 98.00L93.00 97.97L93.69 97.00L94.00 96.63L94.50 96.00L95.00 95.35L95.30 95.00L96.00 94.00L96.00 94.00L96.70 93.00L97.00 92.64L97.50 92.00L98.00 91.36L98.30 91.00L99.00 90.04L99.04 90.00L99.72 89.00L100.00 88.68L100.52 88.00L101.00 87.39L101.33 87.00L102.00 86.04L102.04 86.00L102.71 85.00L103.00 84.67L103.52 84.00L104.00 83.39L104.33 83.00L105.00 82.07L105.07 82.00L105.74 81.00L106.00 80.70L106.53 80.00L107.00 79.41L107.34 79.00L108.00 78.08L108.08 78.00L108.74 77.00L109.00 76.70L109.54 76.00L110.00 75.43L110.36 75.00L111.00 74.12L111.11 74.00L111.76 73.00L112.00 72.73L112.55 72.00L113.00 71.44L113.36 71.00L114.00 70.11L114.11 70.00L114.75 69.00L115.00 68.72L115.56 68.00L116.00 67.45L116.37 67.00L117.00 66.14L117.13 66.00L117.87 65.00L118.00 64.87L118.89 64.00L119.00 63.89L120.00 63.18L120.19 63.00L121.00 62.46L121.86 62.00L122.00 61.89L123.00 61.51L124.00 61.26L124.76 61.00L125.00 60.90L126.00 60.71L127.00 60.66L128.00 60.67L129.00 60.72L130.00 60.92L130.19 61.00L131.00 61.28L132.00 61.52L133.00 61.92L133.10 62.00L134.00 62.49L134.75 63.00L135.00 63.22L136.00 63.91L136.09 64.00L137.00 64.92L137.08 65.00L137.81 66.00L138.00 66.21L138.59 67.00L139.00 67.51L139.40 68.00L140.00 68.79L140.19 69.00L140.84 70.00L141.00 70.17L141.61 71.00L142.00 71.48L142.42 72.00L143.00 72.78L143.20 73.00L143.83 74.00L144.00 74.18L144.60 75.00L145.00 75.49L145.42 76.00L146.00 76.77L146.21 77.00L146.86 78.00L147.00 78.15L147.62 79.00L148.00 79.46L148.43 80.00L149.00 80.76L149.22 81.00L149.87 82.00L150.00 82.14L150.63 83.00L151.00 83.44L151.45 84.00L152.00 84.72L152.25 85.00L152.89 86.00L153.00 86.11L153.64 87.00L154.00 87.44L154.45 88.00L155.00 88.73L155.24 89.00L155.89 90.00L156.00 90.12L156.64 91.00L157.00 91.42L157.46 92.00L158.00 92.70L158.26 93.00L158.92 94.00L159.00 94.08L159.66 95.00L160.00 95.41L160.47 96.00L161.00 96.70L161.26 97.00L161.93 98.00L162.00 98.07L162.68 99.00L163.00 99.38L163.48 100.00L164.00 100.67L164.29 101.00L164.96 102.00L165.00 102.04L165.67 103.00L166.00 103.39L166.48 104.00L167.00 104.68L167.28 105.00L167.96 106.00L168.00 106.04L168.70 107.00L169.00 107.36L169.50 108.00L170.00 108.64L170.30 109.00L171.00 110.00L171.00 110.00L171.70 111.00L172.00 111.35L172.50 112.00L173.00 112.63L173.31 113.00L174.00 113.96L174.04 114.00L174.71 115.00L175.00 115.33L175.54 116.00L176.00 116.51L176.48 117.00L177.00 117.48L177.64 118.00L178.00 118.31L179.00 118.80L179.26 119.00L180.00 119.43L181.00 119.73L181.58 120.00L182.00 120.21L183.00 120.41L184.00 120.51L185.00 120.56L186.00 120.60L187.00 120.60L188.00 120.60L189.00 120.60L190.00 120.60L191.00 120.60L192.00 120.60L193.00 120.60L194.00 120.60L195.00 120.60L196.00 120.60L197.00 120.60L198.00 120.60L199.00 120.60L200.00 120.60L201.00 120.60L202.00 120.60L203.00 120.60L204.00 120.60L205.00 120.60L206.00 120.60L207.00 120.60L208.00 120.60L209.00 120.60L210.00 120.60L211.00 120.60L212.00 120.60L213.00 120.60L214.00 120.60L215.00 120.59L216.00 120.61L216.63 120.00L216.00 119.12L215.89 119.00L215.24 118.00L215.00 117.73L214.45 117.00L214.00 116.44L213.64 116.00L213.00 115.11L212.89 115.00L212.22 114.00L212.00 113.75L211.43 113.00L211.00 112.46L210.62 112.00L210.00 111.14L209.87 111.00L209.22 110.00L209.00 109.76L208.43 109.00L208.00 108.46L207.62 108.00L207.00 107.18L206.83 107.00L206.19 106.00L206.00 105.80L205.41 105.00L205.00 104.49L204.60 104.00L204.00 103.19L203.83 103.00L203.19 102.00L203.00 101.79L202.42 101.00L202.00 100.48L201.60 100.00L201.00 99.21L200.81 99.00L200.17 98.00L200.00 97.81L199.40 97.00L199.00 96.51L198.59 96.00L198.00 95.21L197.81 95.00L197.17 94.00L197.00 93.82L196.40 93.00L196.00 92.52L195.57 92.00L195.00 91.25L194.77 91.00L194.13 90.00L194.00 89.86L193.38 89.00L193.00 88.54L192.57 88.00L192.00 87.24L191.78 87.00L191.14 86.00L191.00 85.85L190.37 85.00L190.00 84.55L189.55 84.00L189.00 83.27L188.76 83.00L188.11 82.00L188.00 81.89L187.36 81.00L187.00 80.57L186.55 80.00L186.00 79.27L185.76 79.00L185.10 78.00L185.00 77.90L184.34 77.00L184.00 76.59L183.53 76.00L183.00 75.31L182.73 75.00L182.08 74.00L182.00 73.92L181.34 73.00L181.00 72.59L180.54 72.00L180.00 71.29L179.74 71.00L179.07 70.00L179.00 69.93L178.32 69.00L178.00 68.62L177.52 68.00L177.00 67.33L176.72 67.00L176.03 66.00L176.00 65.97L175.32 65.00L175.00 64.62L174.51 64.00L174.00 63.34L173.71 63.00L173.02 62.00L173.00 61.98L172.30 61.00L172.00 60.64L171.50 60.00L171.00 59.36L170.70 59.00L170.01 58.00L170.00 57.99L169.31 57.00L169.00 56.64L168.50 56.00L168.00 55.35L167.70 55.00L167.00 54.03L166.97 54.00L166.28 53.00L166.00 52.67L165.48 52.00L165.00 51.38L164.68 51.00L164.00 50.05L163.95 50.00L163.28 49.00L163.00 48.68L162.48 48.00L162.00 47.40L161.66 47.00L161.00 46.08L160.92 46.00L160.27 45.00L160.00 44.69L159.47 44.00L159.00 43.40L158.66 43.00L158.00 42.07L157.93 42.00L157.26 41.00L157.00 40.70L156.46 40.00L156.00 39.42L155.64 39.00L155.00 38.11L154.89 38.00L154.24 37.00L154.00 36.73L153.45 36.00L153.00 35.44L152.64 35.00L152.00 34.12L151.89 34.00L151.24 33.00L151.00 32.74L150.44 32.00L150.00 31.46L149.62 31.00L149.00 30.14L148.87 30.00L148.23 29.00L148.00 28.75L147.43 28.00L147.00 27.46L146.63 27.00L146.00 26.14L145.87 26.00L145.21 25.00L145.00 24.77L144.41 24.00L144.00 23.49L143.60 23.00L143.00 22.19L142.82 22.00L142.19 21.00L142.00 20.79L141.41 20.00L141.00 19.49L140.60 19.00L140.00 18.19L139.83 18.00L139.19 17.00L139.00 16.80L138.40 16.00L138.00 15.51L137.58 15.00L137.00 14.33L136.68 14.00L136.00 13.36L135.59 13.00L135.00 12.52L134.22 12.00L134.00 11.81L133.00 11.40L132.14 11.00L132.00 10.90L131.00 10.58L130.00 10.43L129.00 10.30L128.00 10.25L127.00 10.25L126.00 10.30L125.00 10.42L124.00 10.57Z";

const INNER_PATH_D =
  "M122.00 72.00L122.00 72.00L121.00 72.48L120.09 73.00L120.00 73.08L119.00 73.68L118.66 74.00L118.00 74.61L117.61 75.00L117.00 75.68L116.71 76.00L116.00 77.00L116.00 77.00L115.30 78.00L115.00 78.35L114.50 79.00L114.00 79.65L113.71 80.00L113.03 81.00L113.00 81.03L112.32 82.00L112.00 82.38L111.52 83.00L111.00 83.67L110.72 84.00L110.03 85.00L110.00 85.03L109.33 86.00L109.00 86.40L108.54 87.00L108.00 87.71L107.74 88.00L107.08 89.00L107.00 89.08L106.35 90.00L106.00 90.41L105.53 91.00L105.00 91.70L104.74 92.00L104.10 93.00L104.00 93.11L103.36 94.00L103.00 94.43L102.55 95.00L102.00 95.73L101.76 96.00L101.10 97.00L101.00 97.11L100.36 98.00L100.00 98.43L99.55 99.00L99.00 99.75L98.78 100.00L98.13 101.00L98.00 101.14L97.38 102.00L97.00 102.46L96.57 103.00L96.00 103.76L95.78 104.00L95.14 105.00L95.00 105.15L94.40 106.00L94.00 106.49L93.59 107.00L93.00 107.79L92.81 108.00L92.17 109.00L92.00 109.19L91.40 110.00L91.00 110.49L90.59 111.00L90.00 111.79L89.81 112.00L89.19 113.00L89.00 113.21L88.41 114.00L88.00 114.51L87.60 115.00L87.00 115.82L86.83 116.00L86.19 117.00L86.00 117.21L85.41 118.00L85.00 118.51L84.60 119.00L84.00 119.85L83.86 120.00L83.22 121.00L83.00 121.24L82.43 122.00L82.00 122.54L81.62 123.00L81.00 123.86L80.87 124.00L80.22 125.00L80.00 125.25L79.45 126.00L79.00 126.57L78.64 127.00L78.00 127.89L77.90 128.00L77.25 129.00L77.00 129.28L76.45 130.00L76.00 130.57L75.64 131.00L75.00 131.89L74.90 132.00L74.26 133.00L74.00 133.30L73.46 134.00L73.00 134.59L72.66 135.00L72.00 135.92L71.92 136.00L71.26 137.00L71.00 137.29L70.46 138.00L70.00 138.60L69.67 139.00L69.00 139.96L68.96 140.00L68.28 141.00L68.00 141.33L67.49 142.00L67.00 142.63L66.69 143.00L66.00 143.97L65.97 144.00L65.29 145.00L65.00 145.34L64.50 146.00L64.00 146.65L63.70 147.00L63.00 148.00L63.00 148.00L62.30 149.00L62.00 149.36L61.50 150.00L61.00 150.64L60.70 151.00L60.02 152.00L60.00 152.02L59.32 153.00L59.00 153.38L58.51 154.00L58.00 154.67L57.72 155.00L57.03 156.00L57.00 156.03L56.33 157.00L56.00 157.37L55.49 158.00L55.11 159.00L56.00 159.38L57.00 159.32L58.00 159.34L59.00 159.34L60.00 159.34L61.00 159.34L62.00 159.34L63.00 159.34L64.00 159.34L65.00 159.34L66.00 159.34L67.00 159.34L68.00 159.34L69.00 159.34L70.00 159.34L71.00 159.34L72.00 159.34L73.00 159.34L74.00 159.34L75.00 159.34L76.00 159.34L77.00 159.34L78.00 159.34L79.00 159.34L80.00 159.34L81.00 159.34L82.00 159.34L83.00 159.34L84.00 159.34L85.00 159.34L86.00 159.34L87.00 159.34L88.00 159.34L89.00 159.34L90.00 159.34L91.00 159.34L92.00 159.34L93.00 159.34L94.00 159.34L95.00 159.34L96.00 159.34L97.00 159.34L98.00 159.34L99.00 159.34L100.00 159.34L101.00 159.34L102.00 159.34L103.00 159.34L104.00 159.34L105.00 159.34L106.00 159.34L107.00 159.34L108.00 159.34L109.00 159.34L110.00 159.34L111.00 159.34L112.00 159.34L113.00 159.34L114.00 159.34L115.00 159.34L116.00 159.34L117.00 159.34L118.00 159.34L119.00 159.34L120.00 159.34L121.00 159.34L122.00 159.34L123.00 159.34L124.00 159.34L125.00 159.34L126.00 159.34L127.00 159.34L128.00 159.34L129.00 159.34L130.00 159.34L131.00 159.34L132.00 159.34L133.00 159.34L134.00 159.34L135.00 159.34L136.00 159.34L137.00 159.34L138.00 159.34L139.00 159.34L140.00 159.34L141.00 159.34L142.00 159.34L143.00 159.34L144.00 159.34L145.00 159.34L146.00 159.34L147.00 159.34L148.00 159.34L149.00 159.34L150.00 159.34L151.00 159.34L152.00 159.34L153.00 159.34L154.00 159.34L155.00 159.34L156.00 159.34L157.00 159.34L158.00 159.34L159.00 159.34L160.00 159.34L161.00 159.34L162.00 159.34L163.00 159.34L164.00 159.34L165.00 159.34L166.00 159.34L167.00 159.34L168.00 159.34L169.00 159.34L170.00 159.34L171.00 159.34L172.00 159.34L173.00 159.34L174.00 159.34L175.00 159.34L176.00 159.34L177.00 159.34L178.00 159.34L179.00 159.34L180.00 159.34L181.00 159.34L182.00 159.34L183.00 159.34L184.00 159.34L185.00 159.34L186.00 159.34L187.00 159.34L188.00 159.34L189.00 159.34L190.00 159.34L191.00 159.34L192.00 159.34L193.00 159.34L194.00 159.34L195.00 159.34L196.00 159.34L197.00 159.34L198.00 159.34L199.00 159.34L200.00 159.34L201.00 159.34L202.00 159.34L203.00 159.34L204.00 159.34L205.00 159.34L206.00 159.34L207.00 159.34L208.00 159.34L209.00 159.34L210.00 159.34L211.00 159.34L212.00 159.34L213.00 159.34L214.00 159.34L215.00 159.34L216.00 159.34L217.00 159.34L218.00 159.34L219.00 159.34L220.00 159.34L221.00 159.34L222.00 159.34L223.00 159.34L224.00 159.34L225.00 159.34L226.00 159.34L227.00 159.34L228.00 159.34L229.00 159.34L230.00 159.34L231.00 159.34L232.00 159.34L233.00 159.34L234.00 159.34L235.00 159.34L236.00 159.34L237.00 159.34L238.00 159.34L239.00 159.34L240.00 159.34L241.00 159.34L242.00 159.34L243.00 159.34L244.00 159.33L245.00 159.34L246.00 159.33L246.39 159.00L246.00 158.00L246.00 158.00L245.25 157.00L245.00 156.71L244.45 156.00L244.00 155.43L243.64 155.00L243.00 154.11L242.89 154.00L242.24 153.00L242.00 152.73L241.45 152.00L241.00 151.44L240.64 151.00L240.00 150.12L239.89 150.00L239.24 149.00L239.00 148.74L238.43 148.00L238.00 147.46L237.62 147.00L237.00 146.14L236.87 146.00L236.23 145.00L236.00 144.75L235.43 144.00L235.00 143.46L234.63 143.00L234.00 142.14L233.87 142.00L233.19 141.00L233.00 140.79L232.41 140.00L232.00 139.49L231.60 139.00L231.00 138.19L230.82 138.00L230.19 137.00L230.00 136.79L229.41 136.00L229.00 135.49L228.60 135.00L228.00 134.19L227.83 134.00L227.17 133.00L227.00 132.81L226.39 132.00L226.00 131.57L225.47 131.00L225.00 130.54L224.38 130.00L224.00 129.66L223.00 129.10L222.88 129.00L222.00 128.50L221.00 128.10L220.84 128.00L220.00 127.65L219.00 127.47L218.00 127.33L217.00 127.26L216.00 127.26L215.00 127.26L214.00 127.26L213.00 127.26L212.00 127.26L211.00 127.26L210.00 127.26L209.00 127.26L208.00 127.26L207.00 127.26L206.00 127.26L205.00 127.26L204.00 127.26L203.00 127.26L202.00 127.26L201.00 127.26L200.00 127.26L199.00 127.26L198.00 127.26L197.00 127.26L196.00 127.26L195.00 127.26L194.00 127.26L193.00 127.26L192.00 127.26L191.00 127.26L190.00 127.26L189.00 127.26L188.00 127.26L187.00 127.26L186.00 127.26L185.00 127.26L184.00 127.26L183.00 127.26L182.00 127.26L181.00 127.26L180.00 127.26L179.00 127.26L178.00 127.26L177.00 127.26L176.00 127.26L175.00 127.26L174.00 127.26L173.00 127.26L172.00 127.26L171.00 127.26L170.00 127.26L169.00 127.26L168.00 127.26L167.00 127.26L166.00 127.26L165.00 127.26L164.00 127.26L163.00 127.26L162.00 127.26L161.00 127.26L160.00 127.26L159.00 127.26L158.00 127.26L157.00 127.26L156.00 127.26L155.00 127.26L154.00 127.26L153.00 127.26L152.00 127.26L151.00 127.26L150.00 127.26L149.00 127.26L148.00 127.26L147.00 127.26L146.00 127.26L145.00 127.26L144.00 127.26L143.00 127.26L142.00 127.26L141.00 127.26L140.00 127.26L139.00 127.26L138.00 127.26L137.00 127.26L136.00 127.26L135.00 127.26L134.00 127.26L133.00 127.26L132.00 127.26L131.00 127.16L130.52 127.00L130.00 126.83L129.00 126.53L128.00 126.08L127.92 126.00L127.00 125.37L126.61 125.00L126.00 124.36L125.67 124.00L125.11 123.00L125.00 122.85L124.57 122.00L124.33 121.00L124.14 120.00L124.06 119.00L124.18 118.00L124.37 117.00L124.63 116.00L125.00 115.37L125.25 115.00L125.83 114.00L126.00 113.81L126.59 113.00L127.00 112.49L127.39 112.00L128.00 111.15L128.14 111.00L128.77 110.00L129.00 109.74L129.55 109.00L130.00 108.44L130.36 108.00L131.00 107.09L131.08 107.00L131.73 106.00L132.00 105.69L132.52 105.00L133.00 104.38L133.31 104.00L134.00 103.01L134.01 103.00L134.69 102.00L135.00 101.63L135.48 101.00L136.00 100.31L136.27 100.00L136.92 99.00L137.00 98.92L137.65 98.00L138.00 97.57L138.45 97.00L139.00 96.24L139.22 96.00L139.85 95.00L140.00 94.84L140.60 94.00L141.00 93.51L141.41 93.00L142.00 92.17L142.16 92.00L142.80 91.00L143.00 90.78L143.56 90.00L144.00 89.46L144.37 89.00L145.00 88.14L145.13 88.00L145.45 87.00L145.00 86.38L144.69 86.00L144.00 85.00L144.00 85.00L143.30 84.00L143.00 83.66L142.48 83.00L142.00 82.39L141.67 82.00L141.00 81.04L140.96 81.00L140.28 80.00L140.00 79.67L139.48 79.00L139.00 78.38L138.68 78.00L138.00 77.03L137.97 77.00L137.26 76.00L137.00 75.72L136.38 75.00L136.00 74.61L135.30 74.00L135.00 73.72L134.00 73.11L133.87 73.00L133.00 72.48L132.00 72.03L131.95 72.00L131.00 71.60L130.00 71.41L129.00 71.25L128.00 71.13L127.00 71.00L126.00 71.12L125.00 71.25L124.00 71.41L123.00 71.59Z";

// GSAP-equivalent easing functions
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const progress = (t: number, start: number, dur: number) =>
  clamp01((t - start) / dur);

const power1Out = (p: number) => 1 - (1 - p) * (1 - p);
const power2In = (p: number) => p * p * p;
const power2Out = (p: number) => 1 - Math.pow(1 - p, 3);
const power2InOut = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const power3Out = (p: number) => 1 - Math.pow(1 - p, 4);

const TOTAL_DURATION_SEC = 4.0;

export default function LogoPreloader() {
  const [visible, setVisible] = useState(true);
  const [stageScale, setStageScale] = useState(1);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const floorlineRef = useRef<HTMLDivElement>(null);
  const markWrapRef = useRef<HTMLDivElement>(null);
  const traceOuterRef = useRef<SVGPathElement>(null);
  const traceInnerRef = useRef<SVGPathElement>(null);
  const fillMaskRectRef = useRef<SVGRectElement>(null);
  const sheenRef = useRef<SVGRectElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = Math.max(1, window.innerHeight);
      // Responsive scale: fits 1920x1080 on wide screens, and ensures the 760px mark fills ~78% width on compact mobile viewports
      const containScale = Math.min(vw / 1920, vh / 1080);
      const mobileReadableScale = Math.min((vw * 0.78) / 760, (vh * 0.65) / 478);
      setStageScale(Math.max(containScale, mobileReadableScale));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const outerEl = traceOuterRef.current;
    const innerEl = traceInnerRef.current;
    const outerLen = outerEl ? outerEl.getTotalLength() : 620;
    const innerLen = innerEl ? innerEl.getTotalLength() : 380;

    if (outerEl) {
      outerEl.style.strokeDasharray = `${outerLen}`;
      outerEl.style.strokeDashoffset = `${outerLen}`;
    }
    if (innerEl) {
      innerEl.style.strokeDasharray = `${innerLen}`;
      innerEl.style.strokeDashoffset = `${innerLen}`;
    }

    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = (now - startTime) / 1000;

      if (t >= TOTAL_DURATION_SEC) {
        document.body.style.overflow = prevOverflow;
        setVisible(false);
        return;
      }

      // 1. bg-glow: 0 -> 1.7s, opacity 0->1, scale 0.88->1 (power2.out)
      if (bgGlowRef.current) {
        const p = power2Out(progress(t, 0, 1.7));
        bgGlowRef.current.style.opacity = `${p}`;
        bgGlowRef.current.style.transform = `scale(${lerp(0.88, 1, p)})`;
      }

      // 2. grain: 0.12 -> 1.42s, opacity 0->0.055 (linear)
      if (grainRef.current) {
        const p = progress(t, 0.12, 1.3);
        grainRef.current.style.opacity = `${lerp(0, 0.055, p)}`;
      }

      // 3. vignette: 0.14 -> 1.64s, opacity 0->1 (linear)
      if (vignetteRef.current) {
        const p = progress(t, 0.14, 1.5);
        vignetteRef.current.style.opacity = `${p}`;
      }

      // 4. camera: 0.15 -> 3.55s, scale 1.045 -> 1 (power2.inOut)
      if (cameraRef.current) {
        const p = power2InOut(progress(t, 0.15, 3.4));
        cameraRef.current.style.transform = `scale(${lerp(1.045, 1, p)})`;
      }

      // 5. mark-wrap: rotateX 5->0 (0.4 -> 3.0s) & scale 1.022->1 (1.9 -> 3.8s)
      if (markWrapRef.current) {
        const pRot = power2Out(progress(t, 0.4, 2.6));
        const pScale = t < 1.9 ? 0 : power2Out(progress(t, 1.9, 1.9));
        const rotX = lerp(5, 0, pRot);
        const sc = t < 1.9 ? 1.022 : lerp(1.022, 1, pScale);
        markWrapRef.current.style.transform = `perspective(1800px) rotateX(${rotX}deg) scale(${sc})`;
      }

      // 6. traceOuter & traceInner stroke draw and opacity fade
      if (outerEl) {
        const pDraw = power2InOut(progress(t, 0.32, 1.2));
        outerEl.style.strokeDashoffset = `${lerp(outerLen, 0, pDraw)}`;

        let op = 0.95;
        if (t >= 2.06) {
          op = lerp(0.4, 0, power2In(progress(t, 2.06, 0.34)));
        } else if (t >= 1.35) {
          op = lerp(0.95, 0.4, power1Out(progress(t, 1.35, 0.9)));
        }
        outerEl.style.opacity = `${op}`;
      }

      if (innerEl) {
        const pDraw = power2InOut(progress(t, 1.05, 0.85));
        innerEl.style.strokeDashoffset = `${lerp(innerLen, 0, pDraw)}`;

        let op = 0.95;
        if (t >= 2.06) {
          op = lerp(0.4, 0, power2In(progress(t, 2.06, 0.34)));
        } else if (t >= 1.6) {
          op = lerp(0.95, 0.4, power1Out(progress(t, 1.6, 0.65)));
        }
        innerEl.style.opacity = `${op}`;
      }

      // 7. fillMaskRect: 1.78 -> 2.70s, y: 195 -> -30 (power2.inOut)
      if (fillMaskRectRef.current) {
        const pFill = power2InOut(progress(t, 1.78, 0.92));
        fillMaskRectRef.current.setAttribute("y", `${lerp(195, -30, pFill)}`);
      }

      // 8. flash: 2.5 -> 3.0s (opacity 0->0.55, scale 0.9->1.08), 3.0 -> 3.95s (opacity 0.55->0, scale 1.08->1.18)
      if (flashRef.current) {
        if (t < 2.5) {
          flashRef.current.style.opacity = "0";
        } else if (t < 3.0) {
          const p = power2Out(progress(t, 2.5, 0.5));
          flashRef.current.style.opacity = `${lerp(0, 0.55, p)}`;
          flashRef.current.style.transform = `scale(${lerp(0.9, 1.08, p)})`;
        } else {
          const p = power2InOut(progress(t, 3.0, 0.95));
          flashRef.current.style.opacity = `${lerp(0.55, 0, p)}`;
          flashRef.current.style.transform = `scale(${lerp(1.08, 1.18, p)})`;
        }
      }

      // 9. pool: 2.3 -> 3.4s (opacity 0->0.85, scale 0.92->1)
      if (poolRef.current) {
        if (t < 2.3) {
          poolRef.current.style.opacity = "0";
        } else {
          const p = power2Out(progress(t, 2.3, 1.1));
          poolRef.current.style.opacity = `${lerp(0, 0.85, p)}`;
          poolRef.current.style.transform = `scale(${lerp(0.92, 1, p)})`;
        }
      }

      // 10. floorline: 2.6 -> 3.4s (opacity 0->0.5, scaleX 0.2->1)
      if (floorlineRef.current) {
        if (t < 2.6) {
          floorlineRef.current.style.opacity = "0";
        } else {
          const p = power3Out(progress(t, 2.6, 0.8));
          floorlineRef.current.style.opacity = `${lerp(0, 0.5, p)}`;
          floorlineRef.current.style.transform = `scaleX(${lerp(0.2, 1, p)})`;
        }
      }

      // 11. sheen: 2.55 -> 3.55s, x: -420 -> 420; opacity 0->0.5 (2.64..2.82), 0.5->0 (3.26..3.56)
      if (sheenRef.current) {
        const pX = power2InOut(progress(t, 2.55, 1.0));
        sheenRef.current.setAttribute("x", `${lerp(-420, 420, pX)}`);

        let shOp = 0;
        if (t >= 2.64 && t < 2.82) {
          shOp = lerp(0, 0.5, progress(t, 2.64, 0.18));
        } else if (t >= 2.82 && t < 3.26) {
          shOp = 0.5;
        } else if (t >= 3.26 && t <= 3.56) {
          shOp = lerp(0.5, 0, progress(t, 3.26, 0.3));
        }
        sheenRef.current.setAttribute("opacity", `${shOp}`);
      }

      // 12. reflection: 3.0 -> 3.85s, opacity 0 -> 0.11 (power2.out)
      if (reflectionRef.current) {
        if (t < 3.0) {
          reflectionRef.current.style.opacity = "0";
        } else {
          const p = power2Out(progress(t, 3.0, 0.85));
          reflectionRef.current.style.opacity = `${lerp(0, 0.11, p)}`;
        }
      }

      // 13. Final exit transition between 3.55s and 4.00s so the site opens cleanly at 4 seconds
      if (overlayRef.current) {
        if (t >= 3.55) {
          const pExit = power2InOut(progress(t, 3.55, 0.45));
          overlayRef.current.style.opacity = `${lerp(1, 0, pExit)}`;
        } else {
          overlayRef.current.style.opacity = "1";
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="A carregar Lisis Tecnologias e Serviços"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#050908",
        overflow: "hidden",
        isolation: "isolate",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Full-viewport background layers from motion-source */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1100px 760px at 50% 46%, #0B1512 0%, #060B09 48%, #030605 100%)",
        }}
      />
      <div
        ref={vignetteRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          background:
            "radial-gradient(1200px 820px at 50% 48%, rgba(0,0,0,0) 40%, rgba(0,0,0,.34) 72%, rgba(0,0,0,.72) 100%)",
        }}
      />
      <div
        ref={grainRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/preloader/grain.png")',
          backgroundSize: "128px 128px",
          opacity: 0,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* Responsive 1920x1080 Motion Stage */}
      <div
        style={{
          position: "relative",
          width: "1920px",
          height: "1080px",
          flexShrink: 0,
          transformOrigin: "50% 50%",
          transform: `scale(${stageScale})`,
        }}
      >
        <div
          ref={bgGlowRef}
          style={{
            position: "absolute",
            width: "1700px",
            height: "1700px",
            left: "110px",
            top: "-330px",
            opacity: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,245,213,.16) 0%, rgba(0,245,213,.055) 26%, rgba(0,245,213,0) 58%)",
            filter: "blur(8px)",
            transformOrigin: "50% 50%",
          }}
        />

        <div
          ref={cameraRef}
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "50% 50%",
          }}
        >
          <div
            ref={flashRef}
            style={{
              position: "absolute",
              left: "310px",
              top: "-130px",
              width: "1300px",
              height: "1300px",
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,245,213,.34) 0%, rgba(0,245,213,.10) 30%, rgba(0,245,213,0) 62%)",
              filter: "blur(24px)",
              opacity: 0,
              transformOrigin: "50% 50%",
            }}
          />
          <div
            ref={poolRef}
            style={{
              position: "absolute",
              left: "390px",
              top: "650px",
              width: "1140px",
              height: "340px",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(0,245,213,.20) 0%, rgba(0,245,213,.06) 42%, rgba(0,245,213,0) 70%)",
              filter: "blur(26px)",
              opacity: 0,
              transformOrigin: "50% 50%",
            }}
          />
          <div
            ref={floorlineRef}
            style={{
              position: "absolute",
              left: "640px",
              top: "781px",
              width: "640px",
              height: "2px",
              opacity: 0,
              transformOrigin: "50% 50%",
              background:
                "linear-gradient(90deg, rgba(0,245,213,0) 0%, rgba(0,245,213,.55) 26%, rgba(220,255,250,.8) 50%, rgba(0,245,213,.55) 74%, rgba(0,245,213,0) 100%)",
              filter: "blur(.6px)",
            }}
          />

          <div
            ref={markWrapRef}
            style={{
              position: "absolute",
              left: "580px",
              top: "281px",
              width: "760px",
              height: "478px",
              transformOrigin: "50% 52%",
            }}
          >
            <svg
              viewBox="9.29 10.25 237.1 149.14"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Símbolo da marca Lisis"
              style={{
                position: "absolute",
                inset: 0,
                width: "760px",
                height: "478px",
                overflow: "visible",
                filter:
                  "drop-shadow(0 30px 58px rgba(0,0,0,.55)) drop-shadow(0 0 28px rgba(0,245,213,.20))",
              }}
            >
              <defs>
                <path id="pOuter" d={OUTER_PATH_D} />
                <path id="pInner" d={INNER_PATH_D} />
                <clipPath id="logoClip" clipPathUnits="userSpaceOnUse">
                  <use href="#pOuter" />
                  <use href="#pInner" />
                </clipPath>
                <mask
                  id="fillMask"
                  maskUnits="userSpaceOnUse"
                  x="-10"
                  y="-80"
                  width="280"
                  height="340"
                >
                  <rect
                    ref={fillMaskRectRef}
                    id="fillMaskRect"
                    x="-20"
                    y="195"
                    width="300"
                    height="260"
                    fill="#fff"
                  />
                </mask>
                <linearGradient id="shadeTop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".28" />
                  <stop offset=".44" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="shadeBottom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset=".58" stopColor="#000000" stopOpacity="0" />
                  <stop offset="1" stopColor="#000000" stopOpacity=".24" />
                </linearGradient>
                <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset=".5" stopColor="#ffffff" stopOpacity=".85" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g mask="url(#fillMask)">
                <use href="#pOuter" fill="#00F5D5" />
                <use href="#pInner" fill="#00F5D5" />
                <g clipPath="url(#logoClip)">
                  <rect
                    x="0"
                    y="0"
                    width="260"
                    height="173"
                    fill="url(#shadeTop)"
                  />
                  <rect
                    x="0"
                    y="0"
                    width="260"
                    height="173"
                    fill="url(#shadeBottom)"
                  />
                </g>
              </g>

              <g clipPath="url(#logoClip)">
                <g transform="rotate(-16 128 86)">
                  <rect
                    ref={sheenRef}
                    id="sheen"
                    x="-420"
                    y="-140"
                    width="96"
                    height="440"
                    fill="url(#sheenGrad)"
                    opacity="0"
                  />
                </g>
              </g>

              <path
                ref={traceOuterRef}
                id="traceOuter"
                d={OUTER_PATH_D}
                style={{
                  fill: "none",
                  stroke: "#CDFFF8",
                  strokeWidth: 0.95,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  opacity: 0.95,
                  filter: "drop-shadow(0 0 5px rgba(140,255,242,.85))",
                }}
              />
              <path
                ref={traceInnerRef}
                id="traceInner"
                d={INNER_PATH_D}
                style={{
                  fill: "none",
                  stroke: "#CDFFF8",
                  strokeWidth: 0.95,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  opacity: 0.95,
                  filter: "drop-shadow(0 0 5px rgba(140,255,242,.85))",
                }}
              />
            </svg>

            <div
              ref={reflectionRef}
              style={{
                position: "absolute",
                left: 0,
                top: "496px",
                width: "760px",
                height: "478px",
                opacity: 0,
                filter: "blur(7px)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,.6) 0%, rgba(0,0,0,.18) 24%, rgba(0,0,0,0) 42%)",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,.6) 0%, rgba(0,0,0,.18) 24%, rgba(0,0,0,0) 42%)",
                pointerEvents: "none",
              }}
            >
              <svg
                viewBox="9.29 10.25 237.1 149.14"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{
                  width: "760px",
                  height: "478px",
                  transform: "scaleY(-1)",
                  transformOrigin: "50% 50%",
                }}
              >
                <path d={OUTER_PATH_D} fill="#00F5D5" />
                <path d={INNER_PATH_D} fill="#00F5D5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

