const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Completely New Test Cases
const TEST_DATA = {
  positive: [
    // Simple Sentences
    {
      tcId: 'Pos_Fun_0001',
      name: 'Plural subject-verb agreement',
      input: 'pirimi lamayi sellam karathi',
      expected: 'පිරිමි ලමයි සෙල්ලම් කරති.',
      category: 'Daily language usage',
      grammar: 'Plural form',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0002',
      name: 'Future tense prediction',
      input: 'heta vaessak vahii.',
      expected: 'හෙට වැස්සක් වහී.',
      category: 'Daily language usage',
      grammar: 'Future tense',
      length: 'S'
    },
   {
  tcId: 'Pos_Fun_0003',
  name: "Compound sentence with 'saha'",
  input: 'ammaa kaema uyayi sahaa thaaththaa vaeda karayi.',
  expected: 'අම්මා කෑම උයයි සහ තාත්තා වැඩ කරයි.',
  category: 'Word combination / phrase pattern',
  grammar: 'Compound sentence',
  length: 'S'
},

    
    // Compound Sentences
    {
  tcId: 'Pos_Fun_0004',
  name: "Complex sentence with 'nisa'",
  input: 'vaessa nisaa mama gedhara hitiyaa.',
  expected: 'වැස්ස නිසා මම ගෙදර හිටියා.',
  category: 'Daily language usage',
  grammar: 'Complex sentence',
  length: 'S'
},

   {
  tcId: 'Pos_Fun_0005',
  name: 'Interrogative polite inquiry',
  input: 'oyaata kohomadha saepa saniipa?',
  expected: 'ඔයාට කොහොමද සැප සනීප?',
  category: 'Greeting / request / response',
  grammar: 'Interrogative form',
  length: 'S'
},

    
    // Complex Sentences
    {
tcId: 'Pos_Fun_0006',
name: 'Negative command',
input: 'ehee yanna epaa.',
expected: 'එහේ යන්න එපා.',
category: 'Daily language usage',
grammar: 'Imperative (command)',
length: 'S'
}
,
    
    // Questions
    {
tcId: 'Pos_Fun_0007',
name: 'Mixed technical terms',
input: 'magee laptop eka charge venne naehae.mokak hari prashnayak velaa thiyenavaa.maath ekka meeka hadhaaganna yanna enna puLuvandha oyaata.colombo vala thaenak thiyenavaa ethana hoDHAyi.yana gaman ATM ekatath yanna onee salli ganna.api ehemmama dhavaltath lunch eka gamu 1.30 p.m ta vithara.enna kalin mata WhatsApp msg ekak dhaanna.',
expected: 'මගේ laptop එක charge වෙන්නෙ නැහැ.මොකක් හරි ප්‍රශ්නයක් වෙලා තියෙනවා.මාත් එක්ක මේක හදාගන්න යන්න එන්න පුළුවන්ද ඔයාට.colombo වල තැනක් තියෙනවා එතන හොඳයි.යන ගමන් ATM එකටත් යන්න ඔනේ සල්ලි ගන්න.අපි එහෙම්මම දවල්ටත් lunch එක ගමු 1.30 p.m ට විතර.එන්න කලින් මට WhatsApp ම්ස්ග් එකක් දාන්න.',
category: 'Mixed Singlish + English',
grammar: 'Negation (negative form)',
length: 'M'
},
    {
      tcId: 'Pos_Fun_0008',
name: 'Address and numbers',
input: 'No 45, Galle paara, Colombo 03.',
expected: 'No 45, Galle පාර, Colombo 03.',
category: 'Names / places / common English words',
grammar: 'Simple sentence',
length: 'S'
    },
    {
  tcId: 'Pos_Fun_0009',
name: 'Currency measurement',
input: 'meeka Rs. 500k venavaa.',
expected: 'මේක Rs. 500ක් වෙනවා.',
category: 'Punctuation / numbers',
grammar: 'Simple sentence',
length: 'S'
}
,
    
    // Commands
   {
  tcId: 'Pos_Fun_0010',
name: 'Time format preservation',
input: 'dhaen veelaava 10.30 AM.',
expected: 'දැන් වේලාව 10.30 AM.',
category: 'Punctuation / numbers',
grammar: 'Simple sentence',
length: 'S'
}
,
    {
 tcId: 'Pos_Fun_0011',
name: 'Multi-word slang',
input: 'siraavatama kiyapan machan.oyaa eyaata aadhareyidha ?',
expected: 'සිරාවටම කියපන් මචන්.ඔයා එයාට ආදරෙයිද ?',
category: 'Slang / informal language',
grammar: 'Simple sentence',
length: 'S'
}
,
    
    // Greetings and Responses
    {
 tcId: 'Pos_Fun_0012',
name: 'Formal greeting',
input: 'suBha raathriyak veevaa!',
expected: 'සුබ රාත්‍රියක් වේවා!',
category: 'Greeting / request / response',
grammar: 'Simple sentence',
length: 'S'
}
,
    {
  tcId: 'Pos_Fun_0013',
name: 'Special punctuation test',
input: 'mama adha office yadhdhi manager kiuvaa, "oyaa 7.30 AM vedhdhii report eka submit karanna oonee" eka nisaa mama laptop eka aragena email, Excel file, saha Documents tika attach kalaa, 2025-12-25 venidha kalin complete karanna try kalaa (WiFi slow vuNath), namuth job eka hariyata karaganna oonee kiyalaa mama hithuvaa.api company meeting eka Teams valin karapu velaava 12.00 p.m vithara aethi agenda eka thibune "project update (Phase 2), budget USD 1,500, ETA 2026-05-21" kiyalaa, ehema nisaa manager saha team eka kiyalaa thibuna ASAP tasks complete karanna kiyalaa, mama notes tika laptop ekee type karalaa, pen saha notebook use nokara meeting eka hariyata handle kalaa.',
expected: 'මම අද office යද්දි manager කිඋවා, "ඔයා 7.30 AM වෙද්දී report එක submit කරන්න ඕනේ" එක නිසා මම laptop එක අරගෙන email, Excel file, සහ Documents ටික attach කලා, 2025-12-25 වෙනිද කලින් complete කරන්න try කලා (WiFi slow වුණත්), නමුත් job එක හරියට කරගන්න ඕනේ කියලා මම හිතුවා.අපි company meeting එක Teams වලින් කරපු වෙලාව 12.00 p.m විතර ඇති agenda එක තිබුනෙ "project update (Phase 2), budget USD 1,500, ETA 2026-05-21" කියලා, එහෙම නිසා manager සහ team එක කියලා තිබුන ASAP tasks complete කරන්න කියලා, මම notes ටික laptop එකේ type කරලා, pen සහ notebook use නොකර meeting එක හරියට handle කලා.',
category: 'Punctuation / numbers',
grammar: 'Word combination / phrase pattern',
length: 'L'
}
,
    
    // Tense Variations
   {
  tcId: 'Pos_Fun_0014',
name: 'Word repetition emphasis',
input: 'hitha hitha hitiyaa.',
expected: 'හිත හිත හිටියා.',
category: 'Word combination / phrase pattern',
grammar: 'Past tense',
length: 'S'
}
,
   {
 tcId: 'Pos_Fun_0015',
name: 'Abbreviation handling',
input: 'SLIIT eka Maalabea thiyennee.',
expected: 'SLIIT එක මාලබේ තියෙන්නේ.',
category: 'Names / places / common English words',
grammar: 'Simple sentence',
length: 'S'
}
,
    
    // Negations
    {
  tcId: 'Pos_Fun_0016',
name: 'Mixed measurement units',
input: 'meeka 5kg barayi.',
expected: 'මේක 5kg බරයි.',
category: 'Punctuation / numbers',
grammar: 'Simple sentence',
length: 'S'
}
,
    {
  tcId: 'Pos_Fun_0017',
name: 'Conditional "if" structure',
input: 'ohu avoth api yamu.',
expected: 'ඔහු අවොත් අපි යමු.',
category: 'Daily language usage',
grammar: 'Simple sentence',
length: 'S'
}
,
    
    // Plural and Pronouns
   {
  tcId: 'Pos_Fun_0018',
name: 'Common English loan words',
input: 'bus eka dhaen eyi.',
expected: 'bus එක දැන් එයි.',
category: 'Mixed Singlish + English',
grammar: 'Future tense',
length: 'S'
}
,
    
    // Word Combinations
   {
  tcId: 'Pos_Fun_0019',
name: 'Passive voice attempt',
input: 'eyaa visin eeka karanu laebuvaa.',
expected: 'එයා විසින් ඒක කරනු ලැබුවා.',
category: 'Daily language usage',
grammar: 'Simple sentence',
length: 'S'
}
,
    
    // Mixed Language
    {
      tcId: 'Pos_Fun_0020',
name: 'Proper Noun (Food)',
input: 'api koththu kanna yamu.',
expected: 'අපි කොත්තු කන්න යමු.',
category: 'Daily language usage',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Pos_Fun_0021',
name: 'Exclamation emphasis',
input: 'maara vaedakne eeka!',
expected: 'මාර වැඩක්නේ ඒක!',
category: 'Daily language usage',
grammar: 'Simple sentence',
length: 'S'
    },
    
    // Punctuation
    {
      tcId: 'Pos_Fun_0022',
name: 'Number list formatting',
input: 'adha mata karanna thiyenne 1) email eka check karanna, 2) report eka complete karanna, 3) manager ta call karanna, saha 4) evening velaa meeting ekak ganna kiyalaa list ekak mama note kara gaththaa.',
expected: 'අද මට කරන්න තියෙන්නෙ 1) email එක check කරන්න, 2) report එක complete කරන්න, 3) manager ට call කරන්න, සහ 4) evening වෙලා meeting එකක් ගන්න කියලා list එකක් මම note කර ගත්තා.',
category: 'Formatting (paragraph)',
grammar: 'Simple sentence',
length: 'M'
    },
    
    // Numbers and Formats
    {
      tcId: 'Pos_Fun_0023',
name: 'Informal request',
input: 'anee eeka dhiyan.',
expected: 'අනේ ඒක දියන්.',
category: 'Greeting / request / response',
grammar: 'Imperative (command)',
length: 'S'
    },
    
    // Medium Length
    {
      tcId: 'Pos_Fun_0024',
name: 'Past tense variation',
input: 'eyaa gedhara giyaa.',
expected: 'එයා ගෙදර ගියා.',
category: 'Daily language usage',
grammar: 'Past tense',
length: 'S'
    }
  ],
  
  negative: [
    {
      tcId: 'Neg_Fun_0001',
name: 'Non-standard characters',
input: 'm@m@ gedh@r@',
expected: 'මම ගෙදර',
category: 'Typographical error handling',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0002',
name: 'HTML tag input',
input: 'bold<b>bold</b>',
expected: '<බ්>බෝල්ඩ්</බ්>',
category: 'Formatting (spaces)',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0003',
name: 'Mathematical equations',
input: '(x + y) = z',
expected: '(x + y) = z',
category: 'Punctuation / numbers',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0004',
name: 'Case-sensitive suffix error',
input: 'MAMA gedhara YANAVAA',
expected: 'මම ගෙදර යනවා',
category: 'Typographical error handling',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0005',
name: 'URL within sentence',
input: 'mage site eka www.test.com',
expected: 'මගේ site එක www.test.com',
category: 'Names / places / common English words',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0006',
name: 'English slang "Thx"',
input: 'Thx!',
expected: 'Thx!',
category: 'Mixed Singlish + English',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0007',
name: 'Mixed script (Tamil-Singlish)',
input: 'mama vanakkam kiyanava.',
expected: 'මම vanakkam කියනවා.',
category: 'Mixed Singlish + English',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0008',
name: 'Email address preservation',
input: 'mage mail eka test@gmail.com',
expected: 'මගේ mail එක test@gmail.com',
category: 'Names / places / common English words',
grammar: 'Simple sentence',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0009',
name: 'Non-standard Singlish characters cause incorrect conversion',
input: 'apita sQQKayaa rataa kihipayak ganna puluwan',
expected: 'අපිට සංඛයා රටා කිහිපයක් ගන්න පුලුවන්',
category: 'Typographical error handling.Simple sentence. S (≤30 characters) .Robustness validation',
grammar: '',
length: 'S'
    },
    {
      tcId: 'Neg_Fun_0010',
name: 'Severely misspelled Singlish causes incorrect conversion',
input: 'mama gedhara yanva heta office yanna ona.',
expected: 'මම ගෙදර යනවා හෙට office යන්න ඕන',
category: 'Typographical error handling.Simple sentence. S (≤30 characters) .Robustness validation',
grammar: '',
length: 'S'
    }
  ],
  
  ui: {
   tcId: 'Pos_UI_0001',
name: 'Real-time conversion',
input: 'suBha udhasanak!',
expected: 'සුභ උදසනක්!',
category: 'Empty/cleared input handling',
grammar: 'Simple sentence',
length: 'S'
  },
  ui: {
tcId: 'Pos_UI_0002',
name: 'validation.numeric-only',
input: '705894520',
expected: '705894520',
category: 'Punctuation / numbers.Simple sentence.S (≤30 characters).Error handling / input validation',
grammar: '',
length: 'S'
},

};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
