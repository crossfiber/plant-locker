const { chromium } = require('playwright-core')
;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 430, height: 900 }, deviceScaleFactor: 1.5 })
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', e => errs.push(e.message))
  const out = '/sessions/trusting-admiring-mendel/mnt/Downloads/plant-locker/'
  const base = 'http://localhost:4173/plant-locker/'

  // make a test "photo" to upload
  await page.goto('data:text/html,<body style="margin:0;background:linear-gradient(135deg,%23276b42,%2357b274)"><div style="width:60px;height:60px;margin:60px auto;background:%23f0a17d;border-radius:50%"></div></body>')
  await page.screenshot({ path: '/tmp/testphoto.png' })

  await page.goto(base, { waitUntil: 'networkidle' })
  await page.screenshot({ path: out + '_shot_auth.png' })

  // sign up
  await page.getByRole('tab', { name: 'Create account' }).click()
  await page.getByPlaceholder('@plantperson').fill('cross')
  await page.getByPlaceholder('you@email.com').fill('miami.hype1@gmail.com')
  await page.getByPlaceholder('At least 8 characters').fill('greenhouse22')
  await page.getByRole('button', { name: 'Start your locker' }).click()
  await page.waitForTimeout(500)
  await page.screenshot({ path: out + '_shot_empty.png' })
  console.log('empty state visible:', await page.getByText('Nothing on the shelf yet').count())

  // load examples
  await page.getByText('Load the example shelf').click()
  await page.waitForTimeout(400)
  console.log('after examples, cards:', await page.locator('main .grid button').count())

  // add plant with community species + photo
  await page.getByLabel('Add a plant').click()
  await page.getByPlaceholder('Search by common or scientific name').fill('adansonii')
  await page.waitForTimeout(200)
  await page.getByText("Can't find it? Add it to the directory").click()
  await page.getByPlaceholder('Common name, e.g. Swiss Cheese Vine').fill('Swiss Cheese Vine')
  await page.getByPlaceholder('Scientific name, e.g. Monstera adansonii').fill('Monstera adansonii')
  await page.getByRole('button', { name: 'Verify and add' }).click()
  await page.waitForTimeout(400)
  console.log('verified banner:', await page.getByText('Verified and added to the directory').count())

  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByText('Add a photo (or keep the illustration)').click(),
  ])
  await chooser.setFiles('/tmp/testphoto.png')
  await page.waitForTimeout(600)
  await page.getByPlaceholder('Something like Delores or Big Bird').fill('Cheese')
  await page.waitForTimeout(200)
  await page.screenshot({ path: out + '_shot_add_v2.png', fullPage: true })
  await page.locator('button:has-text("Put Cheese on the shelf")').click()
  await page.waitForTimeout(500)
  await page.screenshot({ path: out + '_shot_locker_v2.png', fullPage: true })

  // persistence: reload
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  console.log('after reload, still logged in:', await page.getByText('@cross').count())
  console.log('after reload, h1:', await page.locator('h1').textContent())
  console.log('after reload, plants text:', await page.getByText('6 plants').count())

  // plant page with photo + privacy persist
  await page.locator('main .grid button').first().click()
  await page.waitForTimeout(400)
  await page.getByRole('radio', { name: 'Public' }).click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: out + '_shot_plant_v2.png', fullPage: true })
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await page.locator('main .grid button').first().click()
  await page.waitForTimeout(400)
  console.log('privacy persisted (Public checked):', await page.getByRole('radio', { name: 'Public' }).getAttribute('aria-checked'))
  await page.getByLabel('Back to locker').click()
  await page.waitForTimeout(300)

  // sign out and back in
  await page.getByTitle('Sign out').click()
  await page.waitForTimeout(300)
  console.log('back at auth:', await page.getByText('Your shelf, wherever you are.').count())
  await page.getByPlaceholder('you@email.com').fill('miami.hype1@gmail.com')
  await page.getByPlaceholder('Your password').fill('greenhouse22')
  await page.getByRole('button', { name: 'Open your locker' }).click()
  await page.waitForTimeout(500)
  console.log('signed back in, plants text:', await page.getByText('6 plants').count())
  console.log('page errors:', errs.length ? errs : 'none')
  await browser.close()
})().catch(e => { console.error('FAIL:', e.message); process.exit(1) })
