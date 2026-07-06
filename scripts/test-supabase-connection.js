#!/usr/bin/env node

/**
 * Supabase Connection Diagnostic Tool
 * Tests various connection formats to find the working one
 */

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const PROJECT_REF = 'rnhuavjjfgvvkzcraddm';
const PASSWORD = 'GUkKqjfiZ26O41J4';
const REGION = 'eu-central-1';

const connectionFormats = [
  {
    name: 'Direct Database Host (Port 5432)',
    url: `postgresql://postgres:${PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
  },
  {
    name: 'Direct Database Host (Port 6543)',
    url: `postgresql://postgres:${PASSWORD}@db.${PROJECT_REF}.supabase.co:6543/postgres`,
  },
  {
    name: 'Pooler with postgres.REF username (Port 5432)',
    url: `postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-${REGION}.pooler.supabase.com:5432/postgres`,
  },
  {
    name: 'Pooler with postgres.REF username (Port 6543)',
    url: `postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-${REGION}.pooler.supabase.com:6543/postgres`,
  },
  {
    name: 'Pooler with postgres username (Port 5432)',
    url: `postgresql://postgres:${PASSWORD}@aws-0-${REGION}.pooler.supabase.com:5432/postgres`,
  },
  {
    name: 'Pooler with postgres username (Port 6543)',
    url: `postgresql://postgres:${PASSWORD}@aws-0-${REGION}.pooler.supabase.com:6543/postgres`,
  },
];

async function testConnection(name, url) {
  console.log(`\n🧪 Testing: ${name}`);
  console.log(`   URL: ${url.replace(PASSWORD, '***')}`);
  
  try {
    const { stdout, stderr } = await execPromise(
      `psql "${url}" -c "SELECT version();" 2>&1`,
      { timeout: 5000 }
    );
    
    if (stdout.includes('PostgreSQL')) {
      console.log(`   ✅ SUCCESS!`);
      return { name, url, success: true };
    } else {
      console.log(`   ❌ Failed: Unexpected response`);
      return { name, url, success: false, error: 'Unexpected response' };
    }
  } catch (error) {
    const errorMsg = error.message || error.stderr || 'Unknown error';
    console.log(`   ❌ Failed: ${errorMsg.split('\n')[0]}`);
    return { name, url, success: false, error: errorMsg };
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     Supabase Connection Diagnostic Tool                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\nProject: ${PROJECT_REF}`);
  console.log(`Region: ${REGION}\n`);
  console.log('Testing various connection formats...\n');
  
  // Check if psql is installed
  try {
    await execPromise('which psql');
  } catch {
    console.log('⚠️  WARNING: psql (PostgreSQL client) not found!');
    console.log('   Install it with: brew install postgresql\n');
    console.log('Continuing with limited testing...\n');
  }
  
  const results = [];
  
  for (const format of connectionFormats) {
    const result = await testConnection(format.name, format.url);
    results.push(result);
  }
  
  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                       RESULTS                              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const successfulConnections = results.filter(r => r.success);
  
  if (successfulConnections.length > 0) {
    console.log('✅ Working connection(s) found!\n');
    
    successfulConnections.forEach((conn, index) => {
      console.log(`${index + 1}. ${conn.name}`);
      console.log(`   Use this in your .env file:\n`);
      console.log(`   DATABASE_URL="${conn.url}"`);
      console.log('');
    });
    
    console.log('\n📝 Recommended .env configuration:\n');
    console.log('# Use the first working connection for both');
    console.log(`DIRECT_URL="${successfulConnections[0].url}"`);
    console.log(`DATABASE_URL="${successfulConnections[0].url}"`);
  } else {
    console.log('❌ No working connections found!\n');
    console.log('Possible issues:');
    console.log('1. Password might be incorrect or changed');
    console.log('2. Database might be paused (check Supabase dashboard)');
    console.log('3. Network/firewall blocking the connection');
    console.log('4. VPN or proxy interfering');
    console.log('\n💡 Next steps:');
    console.log('1. Go to Supabase Dashboard → Settings → Database');
    console.log('2. Copy the connection string EXACTLY as shown');
    console.log('3. Make sure database is not paused');
    console.log('4. Try disabling VPN if you\'re using one');
  }
  
  console.log('\n');
}

main().catch(console.error);
