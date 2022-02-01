import React from 'react';
import { Layout } from '@/components';

const About = () => {
  return (
    <Layout className='py-14' xl allowAll>
      <h2>Want to contribute in the project?</h2>

      <hr className='my-6' />

      <section className='space-y-12'>
        <div>
          <h1 className='about-h1'>Bug Report & Feature Request</h1>
          <ul>
            <li>
              ▸ Open an Issue on{' '}
              <a
                className='text-blue-500'
                href='https://github.com/joshxfi/trackAsOne/issues'
                target='_blank'
                rel='noopener noreferrer'
              >
                GitHub
              </a>
            </li>

            <li>
              ▸ Email me:
              <a className='text-blue-500' href='mailto:joshxfi.dev@gmail.com'>
                {' '}
                joshxfi.dev@gmail.com
              </a>
            </li>

            <li>▸ DM me on Discord: !xfi#1387</li>

            <li>▸ Know me IRL? Contact me on Facebook</li>
          </ul>
        </div>

        <div>
          <h1 className='about-h1'>Contribute Code</h1>
          <ul>
            <li>▸ Coming Soon!</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default About;