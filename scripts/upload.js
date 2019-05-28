(function() {

  'use strict';

  /**
   * Quick and dirty upload script to demonstrate uploading
   * a watermarked image.
   */

  /**
   * A variable for storing the cached target image
   */
  var original;

  /**
   * ids for aws related inputs
   */
  var awsFields = ['accessKeyId', 'policy', 'signature', 'bucket'];

  /**
   * Enable fields identified by ids
   */
  function enableFields(ids) {
    ids.forEach(function(id) {
      document.getElementById(id).removeAttribute('disabled');
    })
  }

  /**
   * Determine if inputs identified by ids have values
   */
  function inputsComplete(ids) {
    return ids.every(function(id) {
      var val = document.getElementById(id);
      return !!val.value;
    });
  }

  /**
   * Given a file input, set the value of the readonly text input associated with it
   */
  function setText(input) {
    var group = input.parentNode.parentNode.parentNode;
    group.querySelector('.form-control').value = input.files[0].name;
  }

  /**
   * A listener that fires when the target image is selected
   */
  function setTarget(file) {
    enableFields(['watermark-button']);
    enableFields(['watermark-text-button']);
    enableFields(['watermark-text-button2']);
    enableFields(['watermark-text-button3']);
    enableFields(['watermark-text-button4']);
    Array.prototype.forEach.call(document.querySelectorAll('input[type=radio]'), function (radio) {
      radio.removeAttribute('disabled');
    });
    watermark([file])
      .image(function(target) { return target;  })
      .then(function (img) { 
        console.log(typeof original);             
        if(! original)
        {
          document.getElementById('preview').appendChild(img);                      
        }
        else
        {
          var oldimg = document.getElementById('preview').querySelector('img');
          document.getElementById('preview').replaceChild(img, oldimg); 
        } 
        original = img;       
      });
    // watermark([file])
    //   .image(function(target) { return target;  })
    //   .then(function (img) {
    //     document.getElementById('preview').appendChild(img);
    //   });      
  }

  /**
   * A listener that fires when the watermark image has been selected
   */
  function setWatermark(file) {
    var preview = document.getElementById('preview'),
        img = preview.querySelector('img'),
        position = document.querySelector('input[type=radio]:checked').value,
        textPosition = document.querySelector('input[name=text-position]:checked').value,
        strText = document.getElementById('watermark-text-name').value,
        strTextSize = document.getElementById('watermark-text-size').value,
        strTextColor = document.getElementById('watermark-text-color').value,
        strTextFont = document.getElementById('watermark-text-font').value,
        fImgAlpha = parseFloat(document.getElementById('watermark-image-alpha').value),
        fImgPosX = parseFloat(document.getElementById('watermark-image-x').value),
        fImgPosY = parseFloat(document.getElementById('watermark-image-y').value),
        fAlpha = parseFloat(document.getElementById('watermark-text-alpha').value),
        fPosX = parseFloat(document.getElementById('watermark-text-x').value),
        fPosY = parseFloat(document.getElementById('watermark-text-y').value),

        strText2 = document.getElementById('watermark-text-name2').value,
        strTextSize2 = document.getElementById('watermark-text-size2').value,
        strTextColor2 = document.getElementById('watermark-text-color2').value,
        strTextFont2 = document.getElementById('watermark-text-font2').value,
        fAlpha2 = parseFloat(document.getElementById('watermark-text-alpha2').value),
        fPosX2 = parseFloat(document.getElementById('watermark-text-x2').value),
        fPosY2 = parseFloat(document.getElementById('watermark-text-y2').value),

        strText3 = document.getElementById('watermark-text-name3').value,
        strTextSize3 = document.getElementById('watermark-text-size3').value,
        strTextColor3 = document.getElementById('watermark-text-color3').value,
        strTextFont3 = document.getElementById('watermark-text-font3').value,
        fAlpha3 = parseFloat(document.getElementById('watermark-text-alpha3').value),
        fPosX3 = parseFloat(document.getElementById('watermark-text-x3').value),
        fPosY3 = parseFloat(document.getElementById('watermark-text-y3').value),

        strText4 = document.getElementById('watermark-text-name4').value,
        strTextSize4 = document.getElementById('watermark-text-size4').value,
        strTextColor4 = document.getElementById('watermark-text-color4').value,
        strTextFont4 = document.getElementById('watermark-text-font4').value,
        fAlpha4 = parseFloat(document.getElementById('watermark-text-alpha4').value),
        fPosX4 = parseFloat(document.getElementById('watermark-text-x4').value),
        fPosY4 = parseFloat(document.getElementById('watermark-text-y4').value);

    if (! original) {
      original = img;
      console.log(typeof img);      
      console.log(typeof original);      
    }

    var bDefinedPosXY = false;
    if(fPosX != 0 || fPosY != 0)
    {
      bDefinedPosXY = true;
    }

    var imgX = function(boat, metrics, context) {
      return fImgPosX;
    };    
    var imgY = function(boat, metrics, context) {
      return fImgPosY;
    };

    var x = function(boat, metrics, context) {
      return fPosX;
    };    
    var y = function(boat, metrics, context) {
      return fPosY;
    };

    var x2 = function(boat, metrics, context) {
      return fPosX2;
    };    
    var y2 = function(boat, metrics, context) {
      return fPosY2;
    };

    var x3 = function(boat, metrics, context) {
      return fPosX3;
    };    
    var y3 = function(boat, metrics, context) {
      return fPosY3;
    };

    var x4 = function(boat, metrics, context) {
      return fPosX4;
    };    
    var y4 = function(boat, metrics, context) {
      return fPosY4;
    };

    if(!file)
    {
      if(bDefinedPosXY)
      {
        watermark([original])
        .image(watermark.text.atPos(x, y, strText, strTextSize+'px '+strTextFont, strTextColor, fAlpha))
        .render()
        .image(watermark.text.atPos(x2, y2, strText2, strTextSize2+'px '+strTextFont2, strTextColor2, fAlpha2))
        .render()
        .image(watermark.text.atPos(x3, y3, strText3, strTextSize3+'px '+strTextFont3, strTextColor3, fAlpha3))
        .render()
        .image(watermark.text.atPos(x4, y4, strText4, strTextSize4+'px '+strTextFont4, strTextColor4, fAlpha4))
        .then(function(marked) {
          preview.replaceChild(marked, img);
          enableFields(awsFields);
        });
      }
      else
      {
        watermark([original])
        .image(watermark.text[textPosition](strText, strTextSize+'px '+strTextFont, strTextColor, fAlpha))
        .then(function(marked) {
          preview.replaceChild(marked, img);
          enableFields(awsFields);
        });
      }      
    }
    else
    {
      if(bDefinedPosXY)
      {
        watermark([original, file])
        .image(watermark.image.atPos(imgX, imgY, fImgAlpha))
        .render()
        .image(watermark.text.atPos(x, y, strText, strTextSize+'px '+strTextFont, strTextColor, fAlpha))
        .render()
        .image(watermark.text.atPos(x2, y2, strText2, strTextSize2+'px '+strTextFont2, strTextColor2, fAlpha2))
        .render()
        .image(watermark.text.atPos(x3, y3, strText3, strTextSize3+'px '+strTextFont3, strTextColor3, fAlpha3))
        .render()
        .image(watermark.text.atPos(x4, y4, strText4, strTextSize4+'px '+strTextFont4, strTextColor4, fAlpha4))
        .then(function(marked) {
          preview.replaceChild(marked, img);
          enableFields(awsFields);
        });
      }
      else
      {
        watermark([original, file])
        .image(watermark.image[position](0.5))
        .render()
        .image(watermark.text[textPosition](strText, strTextSize+'px '+strTextFont, strTextColor, fAlpha))
        .then(function(marked) {
          preview.replaceChild(marked, img);
          enableFields(awsFields);
        });
      }     
    }


    // if(strText !== "")
    // {
    //   watermark([original])
    //     .image(watermark.text[position](strText, '48px Josefin Slab', '#fff', 0.5, 48))
    //     .then(function(marked) {
    //       preview.replaceChild(marked, img);
    //       enableFields(awsFields);
    //     });
    // }  
  }

  /**
   * Check if the watermark has been selected
   */
  function isWatermarkSelected() {
    var watermark = document.getElementById('watermark-name');
    var textWatermark = document.getElementById('watermark-text-name');
    return (!!watermark.value || !!textWatermark.value);
  }

  /**
   * Get a FormData object ready for uploading to S3
   */
  function getFormData(blob, filename, accessKeyId, policy, signature) {
    var fd = new FormData(),
        params = {
          key: filename,
          AWSAccessKeyId: accessKeyId,
          acl: 'private',
          policy: policy,
          signature: signature,
          'Content-Type': '$Content-Type',
          file: [blob, 'watermark.png']
        };

    for (var k in params) {
      var args = Array.isArray(params[k]) ? params[k] : [params[k]];
      fd.append.apply(fd, [k].concat(args));
    }

    return fd;
  }

  /**
   * Perform the upload.
   *
   * @param {FormData}
   * @param {Function} progress handler
   * @param {Function} completion handler
   * @param {Function} error handler
   */
  function upload(onProgress, onComplete, onError) {
    var req = new XMLHttpRequest(),
        key = "watermark-" + Date.now().toString() + '.png',
        img = document.querySelector('#preview img'),
        keyId = document.getElementById('accessKeyId'),
        policy = document.getElementById('policy'),
        signature = document.getElementById('signature'),
        bucket = document.getElementById('bucket');

    watermark([img])
      .blob(function(target) { return target; })
      .then(function(blob) {
        var fd = getFormData(blob, key, keyId.value, policy.value, signature.value);
        req.open('POST', 'https://' + bucket.value + '.s3.amazonaws.com/', true);
        req.upload.onprogress = onProgress;
        req.onreadystatechange = function() {
          if (req.readyState === 4) {
            if (! /Error/.test(req.responseText)) { //simple test for AWS error response
              onComplete();
            } else {
              onError(req.responseText);
            }
          }
        }
        req.addEventListener('error', onError, false);
        req.send(fd);
      });
  }

  /**
   * Run the sample app once dom content has loaded
   */
  document.addEventListener('DOMContentLoaded', function () {

    /**
     * Handle file selections and position choice
     */
    document.addEventListener('change', function (e) {
      var input = e.target;

      if (input.type === 'file') {
        setText(input);
        input.id === 'target' ? setTarget(input.files[0]) : setWatermark(input.files[0]);
      }

      if (input.type === 'radio' && isWatermarkSelected()) {
        setWatermark(document.getElementById('watermark').files[0]);
      }
    });

    /**
     * On keyup for aws inputs, check if the others have been filled in. Once all
     * have been filled in, enable the upload button
     */
    awsFields.forEach(function (id) {
      document.getElementById(id).addEventListener('keyup', function () {
        if (inputsComplete(awsFields)) {
          enableFields(['upload']);
        }
      });
    });

    /**
     * Handle form submission - i.e actually do the upload
     */
    var form = document.getElementById('uploadForm');
    form.addEventListener('submit', function (e) {
      var progress = document.getElementById('progress'),
          bar = progress.querySelector('.progress-bar'),
          complete = document.getElementById('complete'),
          err = document.getElementById('error');

      progress.style.visibility = 'visible';

      upload(function(e) {
        if (e.lengthComputable) {
          var percent = (e.loaded / e.total) * 100;
          bar.style.width = percent + "%";
        }
      }, function () {
        complete.style.display = 'block';
        err.style.display = 'none';
      }, function () {
        err.style.display = 'block';
        complete.style.display = 'none';
      });

      e.preventDefault();
    });


  });


})();
