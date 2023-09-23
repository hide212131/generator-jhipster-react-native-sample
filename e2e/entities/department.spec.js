const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  scrollTo,
} = require('../utils');

describe('Department Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToDepartmentScreen();
  });

  const navigateToDepartmentScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('departmentEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('departmentEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('departmentScreen');
  };

  it('should allow you to create, update, and delete the Department entity', async () => {
    await expect(element(by.id('departmentScreen'))).toBeVisible();

    /*
     * Create Department
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('departmentEditScrollView');
    // departmentName
    await scrollTo('departmentNameInput', 'departmentEditScrollView');
    await element(by.id('departmentNameInput')).replaceText('Ethiopia TCP Frozen');
    await element(by.id('departmentNameInput')).tapReturnKey();
    // departmentPic
    await scrollTo('departmentPicInput', 'departmentEditScrollView');
    // departmentDescription
    await scrollTo('departmentDescriptionInput', 'departmentEditScrollView');
    await element(by.id('departmentDescriptionInput')).replaceText('long-text-blob-content');
    await element(by.id('departmentDescriptionInput')).tapReturnKey();
    // departmentInfoPdf
    await scrollTo('departmentInfoPdfInput', 'departmentEditScrollView');
    await element(by.id('departmentInfoPdfInput')).replaceText('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    await element(by.id('departmentInfoPdfInput')).tapReturnKey();
    await element(by.id('departmentInfoPdfContentTypeInput')).replaceText('image/gif');
    await element(by.id('departmentInfoPdfContentTypeInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'departmentEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Department - validate the creation
     */
    await waitForElementToBeVisibleById('departmentDetailScrollView');
    // departmentName
    await scrollTo('departmentName', 'departmentDetailScrollView');
    await expect(element(by.id('departmentName'))).toHaveLabel('Ethiopia TCP Frozen');
    // departmentPic
    await scrollTo('departmentPic', 'departmentDetailScrollView');
    // departmentDescription
    await scrollTo('departmentDescription', 'departmentDetailScrollView');
    await expect(element(by.id('departmentDescription'))).toHaveLabel('long-text-blob-content');
    // departmentInfoPdf
    await scrollTo('departmentInfoPdf', 'departmentDetailScrollView');
    await expect(element(by.id('departmentInfoPdf'))).toBeVisible();

    /*
     * Update Department
     */
    await scrollTo('departmentEditButton', 'departmentDetailScrollView');
    await tapFirstElementByLabel('Department Edit Button');
    await waitForElementToBeVisibleById('departmentEditScrollView');
    // departmentName
    await scrollTo('departmentNameInput', 'departmentEditScrollView');
    await element(by.id('departmentNameInput')).replaceText('Ethiopia TCP Frozen');
    await element(by.id('departmentNameInput')).tapReturnKey();
    // departmentPic
    await scrollTo('departmentPicInput', 'departmentEditScrollView');
    // departmentDescription
    await scrollTo('departmentDescriptionInput', 'departmentEditScrollView');
    await element(by.id('departmentDescriptionInput')).replaceText('long-text-blob-content-2');
    await element(by.id('departmentDescriptionInput')).tapReturnKey();
    // departmentInfoPdf
    await scrollTo('departmentInfoPdfInput', 'departmentEditScrollView');
    await element(by.id('departmentInfoPdfInput')).replaceText('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    await element(by.id('departmentInfoPdfInput')).tapReturnKey();
    await element(by.id('departmentInfoPdfContentTypeInput')).replaceText('image/gif');
    await element(by.id('departmentInfoPdfContentTypeInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'departmentEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Department - validate the update
     */
    await waitForElementToBeVisibleById('departmentDetailScrollView');
    // departmentName
    await scrollTo('departmentName', 'departmentDetailScrollView');
    await expect(element(by.id('departmentName'))).toHaveLabel('Ethiopia TCP Frozen');
    // departmentPic
    await scrollTo('departmentPic', 'departmentDetailScrollView');
    // departmentDescription
    await scrollTo('departmentDescription', 'departmentDetailScrollView');
    await expect(element(by.id('departmentDescription'))).toHaveLabel('long-text-blob-content-2');
    // departmentInfoPdf
    await scrollTo('departmentInfoPdf', 'departmentDetailScrollView');
    await expect(element(by.id('departmentInfoPdf'))).toBeVisible();

    /*
     * Delete
     */
    await scrollTo('departmentDeleteButton', 'departmentDetailScrollView');
    await waitThenTapButton('departmentDeleteButton');
    await waitForElementToBeVisibleById('departmentDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('departmentScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
