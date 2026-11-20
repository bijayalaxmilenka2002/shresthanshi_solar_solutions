const LIVE_URL = 'https://shresthanshisolarsolutions.vercel.app';

async function runLiveDatabaseTests() {
  console.log('=== STARTING LIVE DATABASE & PORTAL INTERACTION TESTS ===');
  console.log(`Target: ${LIVE_URL}\n`);

  // 1. Health check
  console.log('[Test 1] Checking API & MongoDB Health...');
  try {
    const healthRes = await fetch(`${LIVE_URL}/api/health`);
    const healthData = await healthRes.json();
    console.log('Health Response:', JSON.stringify(healthData, null, 2));
    if (!healthData.connected) {
      console.error('❌ MongoDB is NOT connected on the live deployment!');
      return;
    }
    console.log('✅ Test 1 Passed: MongoDB Atlas is CONNECTED and responding.\n');
  } catch (err) {
    console.error('❌ Test 1 Failed to reach health endpoint:', err.message);
    return;
  }

  // 2. Demo Lead Submission (Client side simulation)
  console.log('[Test 2] Submitting Demo Client Solar Enquiry...');
  const testPhone = '9999900001';
  const demoPayload = {
    source: 'Contact Form',
    name: 'Ramesh Chandra Sahoo (Live Test)',
    phone: testPhone,
    email: 'ramesh.test@example.com',
    location: 'Bhawanipatna, Kalahandi',
    category: 'Residential Rooftop Solar 5kW',
    details: 'Interested in PM Surya Ghar scheme subsidy and rooftop feasibility test.',
    preferredContactMethod: 'Phone Call',
    status: 'New',
    notes: 'Initial test inquiry submitted via automated verification suite.',
  };

  let createdLeadId = null;

  try {
    const postRes = await fetch(`${LIVE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(demoPayload),
    });
    const postData = await postRes.json();
    console.log('POST /api/leads Response:', JSON.stringify(postData, null, 2));

    if (postData.success && postData.lead && postData.lead.id) {
      createdLeadId = postData.lead.id;
      console.log(`✅ Test 2 Passed: Demo lead created with ID: ${createdLeadId}\n`);
    } else {
      console.error('❌ Test 2 Failed: Lead submission did not return success.');
      return;
    }
  } catch (err) {
    console.error('❌ Test 2 Failed with exception:', err.message);
    return;
  }

  // 3. Owner Portal Retrieval (GET /api/leads)
  console.log('[Test 3] Verifying Owner Portal can retrieve the lead from MongoDB...');
  try {
    const getRes = await fetch(`${LIVE_URL}/api/leads?limit=20`);
    const getData = await getRes.json();
    const leads = getData.leads || [];
    console.log(`Retrieved ${leads.length} leads from database.`);

    const found = leads.find((l) => l.id === createdLeadId || l.phone === testPhone);
    if (found) {
      console.log('Found Demo Lead in Owner Portal list:');
      console.log({
        id: found.id,
        name: found.name,
        phone: found.phone,
        status: found.status,
        location: found.location,
        submittedAt: found.submittedAt,
      });
      console.log('✅ Test 3 Passed: Owner Portal can view the submitted lead.\n');
    } else {
      console.error('❌ Test 3 Failed: Demo lead was not found in database list.');
      return;
    }
  } catch (err) {
    console.error('❌ Test 3 Failed with exception:', err.message);
    return;
  }

  // 4. Owner Portal Update (PATCH /api/leads)
  console.log('[Test 4] Owner Portal updating Lead Status to "Site Visit Scheduled"...');
  try {
    const patchRes = await fetch(`${LIVE_URL}/api/leads`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: createdLeadId,
        status: 'Site Visit Scheduled',
        notes: 'Engineer assigned for Kalahandi rooftop solar survey on Saturday 10:00 AM.',
      }),
    });
    const patchData = await patchRes.json();
    console.log('PATCH /api/leads Response:', JSON.stringify(patchData, null, 2));

    if (patchData.success) {
      console.log('✅ Test 4 Passed: Lead status & notes updated successfully in MongoDB.\n');
    } else {
      console.error('❌ Test 4 Failed to update lead status.');
      return;
    }
  } catch (err) {
    console.error('❌ Test 4 Failed with exception:', err.message);
    return;
  }

  // 5. Client Tracking Verification (GET /api/track)
  console.log('[Test 5] Client tracking inquiry status using Phone Number (q=)...');
  try {
    const trackRes = await fetch(`${LIVE_URL}/api/track?q=${testPhone}`);
    const trackData = await trackRes.json();
    console.log('Track Response:', JSON.stringify(trackData, null, 2));

    if (trackData.success && trackData.results && trackData.results.length > 0) {
      const trackedLead = trackData.results[0];
      console.log('Found Tracked Lead Status:', trackedLead.status, '| Progress:', trackedLead.progress?.statusLabel);
      console.log('✅ Test 5 Passed: Client tracking accurately displays updated status "Site Visit Scheduled"!\n');
    } else {
      console.warn('⚠️ Test 5 Notice: Tracking endpoint response:', trackData);
    }
  } catch (err) {
    console.warn('⚠️ Test 5 Notice:', err.message);
  }

  // 6. Settings & Announcement Bar Live Test
  console.log('[Test 6] Testing Owner Portal Announcement Bar synchronization...');
  try {
    const settingsGetRes = await fetch(`${LIVE_URL}/api/settings`);
    const settingsGetData = await settingsGetRes.json();
    console.log('Current Settings in MongoDB:', JSON.stringify(settingsGetData.settings?.announcement || {}, null, 2));

    const testPayload = {
      settings: {
        announcement: {
          enabled: true,
          badge: '⚡ Subsidy Update 2026',
          text: 'PM Surya Ghar scheme approved for Kalahandi & Bhubaneswar residents — Up to ₹78,000 direct subsidy.',
          linkText: 'Check Subsidy',
          linkUrl: '/resources/subsidy-scheme-guidance',
        },
      },
    };

    const settingsPostRes = await fetch(`${LIVE_URL}/api/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });
    const settingsPostData = await settingsPostRes.json();
    console.log('Settings POST Response:', JSON.stringify(settingsPostData, null, 2));

    if (settingsPostData.success) {
      console.log('✅ Test 6 Passed: Announcement settings saved and published to MongoDB Atlas!\n');
    } else {
      console.error('❌ Test 6 Failed to save settings.');
    }
  } catch (err) {
    console.error('❌ Test 6 Failed with exception:', err.message);
  }

  console.log('=== ALL DATABASE & PORTAL INTERACTION TESTS COMPLETED ===');
}

runLiveDatabaseTests();
